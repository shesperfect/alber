import React, { ReactElement, useEffect } from 'react';

import { random, PrimitiveFactory, useRefState } from './package';

import './App.scss';

const App = () => {
  const factory = new PrimitiveFactory();

  const [list, updateList, listRef] = useRefState<ReactElement[]>([]); // TODO: use reducer

  useEffect(() => {
    const handler = (e: any) => {
      switch (e.target.dataset.action) {
        case 'add':
          const primitive = factory.resolve({
            left: random(200, window.innerWidth - 200),
            top: random(200, window.innerHeight - 200),
            index: listRef.current.length,
            onRemove: () => {
              console.log('remove');
              updateList(listRef.current.filter(el => el !== primitive));
            },
          });

          updateList([...listRef.current, primitive]);
          break;
        case 'remove':
          console.log('remove event', e);
      }
    };

    document.addEventListener('click', handler);

    return () => document.removeEventListener('click', handler);
  }, []);

  return (
    <div className="container">
      { list.map((component, index) => (
        <React.Fragment key={ index }>
          { component }
        </React.Fragment>))
      }
      <button className="add-button" data-action="add">Add primitive</button>
    </div>
  );
};

export default App;
