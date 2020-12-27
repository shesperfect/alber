import React, { ReactElement } from 'react';
import { PrimitiveProps } from '../primitives';

export abstract class BaseProvider {
  protected instances = new Set<ReactElement>();

  protected abstract primitiveType:  any;

  resolve(props: PrimitiveProps): ReactElement {
    const instance = React.createElement(this.primitiveType, props);

    this.instances.add(instance);

    return instance;
  }
}
