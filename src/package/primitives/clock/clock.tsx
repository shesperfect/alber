import React, { FunctionComponent, useEffect, useState } from 'react';

import { BasePrimitive, BasePrimitiveProps } from '../base';

import './Clock.scss';

const CLOCK_LIFE_TIME_IN_SEC = 5 * 60;

export const Clock: FunctionComponent<BasePrimitiveProps> = props => {
  const [timer, setTimer] = useState<number>(CLOCK_LIFE_TIME_IN_SEC);

  useEffect(() => {
    const timerID = window.setInterval(() => setTimer(timer - 1), 1000);

    if (timer === 0) window.clearInterval(timerID);

    return () => window.clearInterval(timerID);
  }, [timer]);

  return (
    <BasePrimitive {...props}>
      <div className="clock-wrapper">{ timer } sec</div>
    </BasePrimitive>
  );
}


