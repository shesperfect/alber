import React, { FunctionComponent, useEffect } from 'react';

import { useRefState } from '../../utils';

import './BasePrimitive.scss';

export interface BasePrimitiveProps {
  top: number;
  left: number;
  index: number;
  onRemove: () => void;
}

export const BasePrimitive: FunctionComponent<BasePrimitiveProps> = ({ top, left, index, children }) => {
  const [focused, focus, focusedRef] = useRefState<boolean>(true);
  const [hidden, hide, hiddenRef] = useRefState<boolean>(false);

  useEffect(() => {
    function captureClickHandler(e: any) {
      switch (e.target.dataset.action) {
        case 'add': case 'focus':
          focus(false);
          break;
      }
    }

    function bubbleClickHandler(e: any) {
      switch (e.target.dataset.action) {
        case 'remove':
          if (!e.listeners) e.listeners = [];

          e.listeners.push(() => {
            if (!hiddenRef.current) {
              focus(true);
            }

            return hiddenRef.current;
          });

          if (focusedRef.current) {
            e.listeners.reverse().every(callback => callback());
          }

          break;
      }
    }

    function keyboardHandler(e: any) {
      if (e.key === 'Escape') {
        if (!e.listeners) e.listeners = [];

        e.listeners.push(() => {
          if (!hiddenRef.current) {
            focus(true);
          }

          return hiddenRef.current;
        });

        if (focusedRef.current) {
          hide(true);
          e.listeners.reverse().every(callback => callback());
          e.stopImmediatePropagation();
        }
      }
    }

    document.addEventListener('click', captureClickHandler, true);
    document.addEventListener('click', bubbleClickHandler);
    document.addEventListener('keyup', keyboardHandler);

    return () => {
      document.removeEventListener('click', captureClickHandler, true);
      document.removeEventListener('click', bubbleClickHandler);
      document.removeEventListener('keyup', keyboardHandler);
    }
  }, []);

  return (
    <div
      className={ `wrapper ${ focused ? 'focused' : '' } ${ hidden ? 'hidden' : '' }` }
      style={{ top, left }}>
      { children }
      <div className="buttons">
        <button onClick={ () => hide(true) }
                className="btn remove-btn"
                data-action="remove">Remove</button>
        <button onClick={ () => focus(true) }
                className="btn focus-btn"
                data-action="focus"
                disabled={ focused }>{ focused ? 'Focused' : 'Focus' }
        </button>
      </div>
      <span className="number">{ index }</span>
    </div>
  );
}




