import { useRef, useState } from 'react';

export function random(min = 0, max = 1) {
  return Math.random() * (max - min) + min;
}

export function randomInt(min = 0, max = 100) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomHEX(): string {
  return Math.floor(Math.random()*16777215).toString(16);
}

export function useRefState<T>(initial) {
  const [state, stateHandler] = useState<T>(initial);
  const ref = useRef<T>(state);

  const refHandler = (newState: T) => {
    stateHandler(newState);
    ref.current = newState;
  };

  return [state, refHandler, ref] as const;
}
