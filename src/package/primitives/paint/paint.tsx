import React from 'react';

import { BasePrimitive, PrimitiveProps } from '../base';

import './Paint.scss';

interface PaintProps extends PrimitiveProps {}

export class Paint extends React.Component<PaintProps, any> {
  render() {
    const { left, top } = this.props;

    return (
      <BasePrimitive left={ left } top={ top }>
        <div className="paint-wrapper">Paint</div>
      </BasePrimitive>
  );
  }
}
