import React from 'react';

import { BasePrimitive, PrimitiveProps } from '../base';
import { random } from '../../utils';

import './Paint.scss';

interface PaintProps extends PrimitiveProps {}

interface PaintState {
  color: number;
}

export class Paint extends React.Component<PaintProps, PaintState> {
  constructor(props: PaintProps) {
    super(props);

    this.state = {
      color: random(),
    };
  }

  private update() {
    this.setState(state => ({
      color: state.color + .01
    }));
  }

  render() {
    const { left, top } = this.props;

    return (
      <BasePrimitive left={ left } top={ top }>
        <div className="paint-wrapper"
             style={{ borderBottomColor: `#${Math.floor(this.state.color * 16777215).toString(16)}` }}
             onClick={ () => this.update() } />
      </BasePrimitive>
  );
  }
}
