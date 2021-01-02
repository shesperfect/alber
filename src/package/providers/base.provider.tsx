import React, { FunctionComponent, ReactElement } from 'react';
import { BasePrimitiveProps } from '../primitives/base';

export abstract class BaseProvider {
  protected instances = new Set<ReactElement>();

  protected abstract primitiveType: FunctionComponent<BasePrimitiveProps>;

  resolve(props): any {
    const Type = this.primitiveType;
    const instance = <Type {...props} />;

    this.instances.add(instance);

    return instance;
  }
}
