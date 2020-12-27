import React from 'react';

import { BasePrimitive, PrimitiveProps } from '../base';
import { randomHEX } from '../../utils';

import './Paint.scss';

interface PaintProps extends PrimitiveProps {}

interface PaintState {
  color: string;
}

export class Paint extends React.Component<PaintProps, PaintState> {
  constructor(props: PaintProps) {
    super(props);

    this.state = {
      color: randomHEX(),
    };
  }

  private update() {
    this.setState(() => ({
      color: randomHEX()
    }));
  }

  render() {
    const { left, top, index, onRemove } = this.props;

    return (
      <BasePrimitive left={ left } top={ top } index={ index } onRemove={ onRemove }>
        <div className="paint-wrapper"
             style={{ borderBottomColor: `#${this.state.color}` }}
             onClick={ () => this.update() } />
      </BasePrimitive>
  );
  }
}
