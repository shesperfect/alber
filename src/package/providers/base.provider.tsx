import { FunctionComponent } from 'react';
import { BasePrimitiveProps } from '../primitives/base';

export abstract class BaseProvider {
  protected abstract primitiveType: FunctionComponent<BasePrimitiveProps>;

  resolve(): any {
    return this.primitiveType;
  }
}
