import { BaseProvider, ClockProvider, PaintProvider, WindowProvider } from './providers';
import { PrimitiveDescriptor } from './primitives/base';
import { randomInt } from './utils';

export class PrimitiveFactory {
  private providers: BaseProvider[] = [
    new ClockProvider(),
    new PaintProvider(),
    new WindowProvider(),
  ];

  resolve(props): PrimitiveDescriptor {
    return this.providers[randomInt(0, this.providers.length - 1)].resolve(props);
  }
}
