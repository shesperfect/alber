import React, { ReactElement } from 'react';

import { BaseProvider } from './base.provider';
import { Paint } from '../primitives';

export class PaintProvider extends BaseProvider {
  resolve(left: number, top: number): ReactElement {
    const instance = React.createElement(Paint, {
      left, top,
    });

    this.instances.add(instance);

    return instance;
  }
}
