import { ReactElement } from 'react';

export abstract class BaseProvider {
  protected instances = new Set<ReactElement>();

  abstract resolve(left: number, top: number): ReactElement;
}
