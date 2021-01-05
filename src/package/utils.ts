import { RefObject, useEffect, useRef, useState } from 'react';
import { Point } from './types';

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

export function useDragNDrop(elementRef: RefObject<HTMLElement>, left = 0, top = 0) {
  const [position, setPosition, positionRef] = useRefState<Point>({ x: left, y: top });

  useEffect(() => {
    let isMoving = false;
    let initialCursor: Point;
    let initialCoords: Point;

    const onMouseDown = e => {
      isMoving = true;
      initialCursor = { x: e.clientX, y: e.clientY };
      initialCoords = { x: positionRef.current.x, y: positionRef.current.y };
    };

    const onMouseMove = e => {
      if (isMoving) {
        e.preventDefault();

        setPosition({
          x: initialCoords.x + e.clientX - initialCursor.x,
          y: initialCoords.y + e.clientY - initialCursor.y,
        });
      }
    };

    const onMouseUp = e => {
      isMoving && e.stopImmediatePropagation();

      isMoving = false;
    };

    elementRef.current?.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseout', onMouseUp);
    elementRef.current?.addEventListener('mouseup', onMouseUp);

    return () => {
      elementRef.current?.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseout', onMouseUp);
      elementRef.current?.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  return position;
}
