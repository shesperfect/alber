import { FunctionComponent } from 'react';
import { BasePrimitiveProps, PrimitiveDescriptor } from '../primitives/base';

export abstract class BaseProvider {
  /**
   * Хранилище всех созданных дескрипторов конкретного типа.
   * В коде не используется, оно здесь лишь потому, что это часть задания - хранить созданные инстансы в независимых структурах данных.
   */
  protected list = new Set<PrimitiveDescriptor>();

  protected abstract primitiveType: FunctionComponent<BasePrimitiveProps>;

  resolve(props: BasePrimitiveProps): PrimitiveDescriptor {
    const descriptor = {
      type: this.primitiveType,
      props,
    };

    this.list.add(descriptor);

    return descriptor;
  }
}
