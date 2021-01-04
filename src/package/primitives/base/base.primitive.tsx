import React, { createRef, FunctionComponent, useEffect } from 'react';

import { useDragNDrop } from '../../utils';

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

  const wrapperRef = createRef<HTMLDivElement>();
  const position = useDragNDrop(wrapperRef, left, top);

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
      style={{ left: position.x, top: position.y }}
      ref={ wrapperRef }>
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




