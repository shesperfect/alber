import { BaseProvider } from './base.provider';
import { Clock } from '../primitives';

export class ClockProvider extends BaseProvider {
  protected primitiveType = Clock;
}
