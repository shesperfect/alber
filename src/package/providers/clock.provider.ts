import React, { ReactElement } from 'react';

import { BaseProvider } from './base.provider';
import  { Clock } from '../primitives';

export class ClockProvider extends BaseProvider {
  resolve(left: number, top: number): ReactElement {
    const instance = React.createElement(Clock, {
      left, top,
    });

    this.instances.add(instance);

    return instance;
  }
}
