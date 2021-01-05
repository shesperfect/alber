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

  const moveButtonRef = createRef<HTMLButtonElement>();
  const position = useDragNDrop(moveButtonRef, left, top);

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
      style={{ left: position.x, top: position.y }}>
      { children }
      <div className="buttons">
        <button onClick={ onRemove }
                className="btn remove-btn">Remove
        </button>
        <button onClick={ onFocus }
                className="btn focus-btn"
                disabled={ focused }>{ focused ? 'Focused' : 'Focus' }
        </button>
        <button className="btn move-btn"
                ref={moveButtonRef}>Move
        </button>
      </div>
      <span className="number">{ index }</span>
    </div>
  );
}





