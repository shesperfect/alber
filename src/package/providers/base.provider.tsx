import React from 'react';

export abstract class BaseProvider {
  protected instances = new Set();

  protected abstract primitiveType: any;

  resolve(props): any {
    const Type = this.primitiveType;
    const instance = <Type {...props} />;

    this.instances.add(instance);

    return instance;
  }
}
