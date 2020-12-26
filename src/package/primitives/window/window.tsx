import React from 'react';

import { BasePrimitive, PrimitiveProps } from '../base';

import './Window.scss';

interface WindowProps extends PrimitiveProps {}

export class Window extends React.Component<WindowProps, any> {
  componentDidMount() {}

  render() {
    const { left, top } = this.props;

    return (
      <BasePrimitive left={ left } top={ top }>
        <div className="window-wrapper">Window</div>
      </BasePrimitive>
    );
  }
}
