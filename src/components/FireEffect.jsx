import React from 'react';

const FireEffect = ({ className }) => {
  return (
    <div className={`pointer-events-none absolute z-50 flex justify-center items-end ${className}`} style={{ width: '60px', height: '60px' }}>
      <div className="relative w-full h-full animate-[flicker_0.15s_ease-in-out_infinite_alternate] origin-bottom">
        {/* Main Orange Flame */}
        <div 
          className="absolute bottom-0 left-[15%] w-[70%] h-[70%] bg-[#ff6600] rounded-[50%_0_50%_50%] -rotate-45"
          style={{ boxShadow: '0 0 20px #ff6600', mixBlendMode: 'screen' }}
        />
        {/* Inner Yellow Flame */}
        <div 
          className="absolute bottom-[10%] left-[25%] w-[50%] h-[50%] bg-[#ffcc00] rounded-[50%_0_50%_50%] -rotate-45"
          style={{ boxShadow: '0 0 15px #ffcc00', mixBlendMode: 'screen' }}
        />
        {/* Center White Core */}
        <div 
          className="absolute bottom-[20%] left-[35%] w-[30%] h-[30%] bg-[#ffffff] rounded-[50%_0_50%_50%] -rotate-45"
          style={{ boxShadow: '0 0 10px #ffffff' }}
        />
      </div>
    </div>
  );
};

export default FireEffect;
