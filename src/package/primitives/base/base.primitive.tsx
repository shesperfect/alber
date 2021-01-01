import React, { useEffect, useState } from 'react';

import './BasePrimitive.scss';

export const BasePrimitive = props => {
  const [focused, setFocus] = useState<boolean>(true);
  const [hidden, setHidden] = useState<boolean>(false);
  const { top, left, index, children } = props;

  useEffect(() => {
    function captureClickHandler(e: any) {
      switch (e.target.dataset.action) {
        case 'add': case 'focus':
          setFocus(false);
          break;
      }
    }

    function bubbleClickHandler(e: any) {
      switch (e.target.dataset.action) {
        case 'remove':
          if (!e.listeners) e.listeners = [];

          e.listeners.push(() => setFocus(true));

          if (focused) {
            e.listeners.reverse()[e.listeners.length - 1]();
            e.stopImmediatePropagation();
          }

          break;
      }
    }

    document.addEventListener('click', captureClickHandler, true);
    document.addEventListener('click', bubbleClickHandler);

    return () => {
      document.removeEventListener('click', captureClickHandler, true);
      document.removeEventListener('click', bubbleClickHandler);
    }
  }, [focused, hidden]);

  return (
    <div
      className={ `wrapper ${ focused ? 'focused' : '' } ${ hidden ? 'hidden' : '' }` }
      style={{ top, left }}>
      { children }
      <div className="buttons">
        <button onClick={ () => setHidden(true) }
                className="btn remove-btn"
                data-action="remove">Remove</button>
        <button onClick={ () => setFocus(true) }
                className="btn focus-btn"
                data-action="focus"
                disabled={ focused }>{ focused ? 'Focused' : 'Focus' }
        </button>
      </div>
      <span className="number">{ index }</span>
    </div>
  );
}


