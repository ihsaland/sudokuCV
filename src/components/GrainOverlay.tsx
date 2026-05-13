import React from 'react';

const GrainOverlay: React.FC = () => (
  <div
    style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9988,
      pointerEvents: 'none',
      opacity: 0.038,
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='256' height='256' filter='url(%23n)'/%3E%3C/svg%3E")`,
      backgroundRepeat: 'repeat',
      backgroundSize: '256px 256px',
    }}
  />
);

export default GrainOverlay;
