import React, { FunctionComponent, useEffect } from 'react';

import { BasePrimitive, BasePrimitiveProps } from '../base';
import { useRefState } from '../../custom.effects';

import './Clock.scss';

const CLOCK_LIFE_TIME_IN_SEC = 5 * 60;

export const Clock: FunctionComponent<BasePrimitiveProps> = props => {
  const [timer, setTimer, timerRef] = useRefState<number>(CLOCK_LIFE_TIME_IN_SEC);

  useEffect(() => {
    const timerID = window.setInterval(() => {
      setTimer(timerRef.current - 1);

      if (timerRef.current === 0) window.clearInterval(timerID);
    }, 1000);

    return () => window.clearInterval(timerID);
  }, []);

  return (
    <BasePrimitive {...props}>
      <div className="clock-wrapper">{ timer } sec</div>
    </BasePrimitive>
  );
}


