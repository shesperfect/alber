import React, { ReactElement } from 'react';

export abstract class BaseProvider {
  protected instances = new Set<ReactElement>();

  protected abstract primitiveType:  any;

  resolve(left: number, top: number): ReactElement {
    const instance = React.createElement(this.primitiveType, {
      left, top,
    });

    this.instances.add(instance);

    return instance;
  }
}
