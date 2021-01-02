import React, { FunctionComponent, useState } from 'react';

import { BasePrimitive, BasePrimitiveProps } from '../base';
import { randomHEX } from '../../utils';

import './Paint.scss';

export const Paint: FunctionComponent<BasePrimitiveProps> = props => {
  const [color, setColor] = useState<string>(randomHEX());

  return (
    <BasePrimitive {...props}>
      <div className="paint-wrapper"
           style={{ borderBottomColor: `#${color}` }}
           onClick={ () => setColor(randomHEX()) } />
    </BasePrimitive>
  );

}


