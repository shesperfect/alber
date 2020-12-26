import React, { ReactElement } from 'react';

import { BaseProvider } from './base.provider';
import  { Window } from '../primitives';

export class WindowProvider extends BaseProvider {
  resolve(left: number, top: number): ReactElement {
    const instance = React.createElement(Window, {
      left, top,
    });

    this.instances.add(instance);

    return instance;
  }
}
