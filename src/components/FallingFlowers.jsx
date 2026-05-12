import React, { useEffect, useRef } from 'react';

const FallingFlowers = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Create flower petals
    const petals = [];
    const numPetals = 50; // More prominent amount

    for (let i = 0; i < numPetals; i++) {
      petals.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height * -1, // Start above screen
        size: Math.random() * 8 + 8, // 8px to 16px
        speedY: Math.random() * 1.5 + 0.8, // slightly faster falling
        speedX: Math.random() * 0.6 - 0.3, // slow drift
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: Math.random() * 0.02 - 0.01,
        color: `rgba(255, 182, 193, ${Math.random() * 0.4 + 0.6})` // richer soft pink/white
      });
    }

    const drawPetal = (ctx, x, y, size, rotation, color) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.fillStyle = color;
      
      // Draw a simple petal shape using bezier curves
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(size / 2, size, 0, size * 1.5);
      ctx.quadraticCurveTo(-size / 2, size, 0, 0);
      ctx.fill();
      
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      petals.forEach((petal) => {
        // Update position
        petal.y += petal.speedY;
        petal.x += petal.speedX + Math.sin(petal.y * 0.01) * 0.5; // gentle sway
        petal.rotation += petal.rotationSpeed;

        // Reset to top if it falls off bottom or drifts off screen
        if (petal.y > canvas.height + petal.size * 2) {
          petal.y = -20;
          petal.x = Math.random() * canvas.width;
        }

        drawPetal(ctx, petal.x, petal.y, petal.size, petal.rotation, petal.color);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-[46] pointer-events-none"
      style={{ opacity: 1 }}
    />
  );
};

export default FallingFlowers;
