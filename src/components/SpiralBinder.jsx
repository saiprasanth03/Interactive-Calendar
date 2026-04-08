import React from 'react';

const SpiralBinder = ({ count }) => (
  <div className="spiral-binder">
    {[...Array(count)].map((_, i) => (
      <div key={i} className="spiral-ring">
        <div className="ring-metal"></div>
      </div>
    ))}
  </div>
);

export default SpiralBinder;
