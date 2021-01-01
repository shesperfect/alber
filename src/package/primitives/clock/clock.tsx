import React, { useEffect, useState } from 'react';

import { BasePrimitive } from '../base';

import './Clock.scss';

export const Clock = props => {
  const [timer, setTimer] = useState<number>(5 * 60);

  useEffect(() => {
    const timerID = window.setTimeout(() => setTimer(timer - 1), 1000);

    if (timer === 0) window.clearTimeout(timerID);

    return () => window.clearTimeout(timerID);
  });

  return (
    <BasePrimitive {...props}>
      <div className="clock-wrapper">{ timer } sec</div>
    </BasePrimitive>
  );
}


