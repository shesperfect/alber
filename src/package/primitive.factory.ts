import { BaseProvider, ClockProvider, PaintProvider, WindowProvider } from './providers';
import { randomInt } from './utils';

export class PrimitiveFactory {
  private providers: BaseProvider[] = [
    new ClockProvider(),
    new PaintProvider(),
    new WindowProvider(),
  ];

  resolve(props): any {
    return this.providers[randomInt(0, this.providers.length - 1)].resolve(props);
  }
}
