import React, { FunctionComponent, useEffect } from 'react';

import './BasePrimitive.scss';

export interface BasePrimitiveProps {
  top: number;
  left: number;
  index: number;
  focused: boolean;
  onRemove: () => void;
  onFocus: () => void;
}

export interface PrimitiveDescriptor {
  type: FunctionComponent<BasePrimitiveProps>;
  props: BasePrimitiveProps;
}

export const BasePrimitive: FunctionComponent<BasePrimitiveProps> =
  ({ top, left, index, focused, children, onRemove, onFocus }) => {

  useEffect(() => {
    function keyboardHandler(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        focused && onRemove();
      }
    }

    document.addEventListener('keyup', keyboardHandler);

    return () => document.removeEventListener('keyup', keyboardHandler);
  }, [focused]);

  return (
    <div
      className={ `wrapper ${ focused ? 'focused' : '' }` }
      style={{ top, left }}>
      { children }
      <div className="buttons">
        <button onClick={ onRemove }
                className="btn remove-btn"
                data-action="remove">Remove</button>
        <button onClick={ onFocus }
                className="btn focus-btn"
                data-action="focus"
                disabled={ focused }>{ focused ? 'Focused' : 'Focus' }
        </button>
      </div>
      <span className="number">{ index }</span>
    </div>
  );
}




