import { useRef, useEffect, useState, useCallback } from 'react';
import { cn } from '../utils/cn';

const ScratchReveal = ({ className }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const isDrawing = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });
  const [revealed, setRevealed] = useState(false);
  const [ready, setReady] = useState(false);

  const drawFoil = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    // Golden foil gradient
    const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    gradient.addColorStop(0, '#C9A961');
    gradient.addColorStop(0.25, '#E8D5A3');
    gradient.addColorStop(0.5, '#F5E6C8');
    gradient.addColorStop(0.75, '#D4AF37');
    gradient.addColorStop(1, '#B8962E');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Shimmer sparkles - adjusted for DPI
    const sparkleCount = Math.min(4000, rect.width * rect.height * 0.1);
    for (let i = 0; i < sparkleCount; i++) {
      const x = Math.random() * rect.width;
      const y = Math.random() * rect.height;
      const alpha = Math.random() * 0.35;
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.fillRect(x, y, Math.random() * 2, Math.random() * 2);
    }

    // Decorative text
    ctx.fillStyle = 'rgba(100, 70, 20, 0.6)';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `bold ${Math.min(rect.width * 0.06, 20)}px serif`;
    ctx.fillText('Scratch to Reveal', rect.width / 2, rect.height / 2);

    setReady(true);
  }, []);

  useEffect(() => {
    // Use RAF + timeout to ensure container has dimensions
    const timer = setTimeout(() => {
      requestAnimationFrame(drawFoil);
    }, 100);
    
    const observer = new ResizeObserver(() => {
      if (!revealed) drawFoil();
    });
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [drawFoil, revealed]);

  const getPos = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return { x: clientX - rect.left, y: clientY - rect.top };
  };

  const scratchDistance = useRef(0);

  const scratch = (pos) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.globalCompositeOperation = 'destination-out';
    
    // Calculate distance for instant reveal
    const dx = pos.x - lastPos.current.x;
    const dy = pos.y - lastPos.current.y;
    scratchDistance.current += Math.sqrt(dx * dx + dy * dy);

    // If scratched enough distance (approx 2-3 swipes), reveal immediately
    if (scratchDistance.current > 800) {
      setRevealed(true);
    }

    // Circle at current position
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 30, 0, Math.PI * 2);
    ctx.fill();

    // Smooth line from last position
    ctx.lineWidth = 60;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(lastPos.current.x, lastPos.current.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();

    ctx.globalCompositeOperation = 'source-over';
    lastPos.current = pos;
  };

  const checkReveal = () => {
    const canvas = canvasRef.current;
    if (!canvas || canvas.width === 0) return;
    const ctx = canvas.getContext('2d');
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let transparent = 0;
    const total = data.length / 4;
    // Sample every 4th pixel for performance
    for (let i = 3; i < data.length; i += 16) {
      if (data[i] === 0) transparent++;
    }
    if ((transparent / (total / 4)) * 100 > 15) {
      setRevealed(true);
    }
  };

  const handleStart = (e) => {
    if (revealed) return;
    isDrawing.current = true;
    const pos = getPos(e);
    lastPos.current = pos;
    scratch(pos);
  };

  const handleMove = (e) => {
    if (!isDrawing.current || revealed) return;
    e.preventDefault();
    scratch(getPos(e));
  };

  const handleEnd = () => {
    if (revealed) return;
    isDrawing.current = false;
    checkReveal();
  };

  return (
    <div 
      ref={containerRef} 
      className={cn("absolute z-50 overflow-hidden rounded-lg shadow-xl", className)}
      style={{ pointerEvents: revealed ? 'none' : 'auto' }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          touchAction: 'none',
          cursor: revealed ? 'default' : 'pointer',
          transition: revealed ? 'opacity 1s ease-out' : 'none',
          opacity: revealed ? 0 : 1,
        }}
        onMouseDown={handleStart}
        onMouseMove={handleMove}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={handleStart}
        onTouchMove={handleMove}
        onTouchEnd={handleEnd}
      />
    </div>
  );
};

export default ScratchReveal;
