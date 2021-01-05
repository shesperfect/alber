import React, { FunctionComponent } from 'react';

import {
  random, PrimitiveFactory, PrimitiveDescriptor, useRefState,
} from './package';

import './App.scss';

const App: FunctionComponent = () => {
  const factory = new PrimitiveFactory();

  const [list, updateList, listRef] = useRefState<PrimitiveDescriptor[]>([]);

  const add = () => {
    const descriptor: PrimitiveDescriptor = factory.resolve({
      left: random(200, window.innerWidth - 200),
      top: random(200, window.innerHeight - 200),
      index: listRef.current.length,
      focused: true,
      key: Symbol(listRef.current.length).toString(),
      onRemove: () => {
        if (descriptor.props.focused) {
          const indexToRemove = listRef.current.findIndex(d => d === descriptor);
          const indexToFocus = indexToRemove - 1 < 0
            ? listRef.current.length - 1
            : indexToRemove - 1;
          listRef.current[indexToFocus].props.focused = true;
        }

        const newList = listRef.current.filter(d => d !== descriptor);

        updateList(newList);
      },
      onFocus: () => updateList(listRef.current.map(d => {
        d.props.focused = (d === descriptor);
        return d;
      })),
    });

    list.forEach(d => d.props.focused = false);

    updateList([...list, descriptor]);
  };

  return (
    <div className="container">
      {
        list.map(descriptor => {
          const { type: Type, props } = descriptor;

          return (<Type {...props} />);
        })
      }
      <button className="add-button" onClick={ add }>Add primitive</button>
    </div>
  );
};

export default App;
