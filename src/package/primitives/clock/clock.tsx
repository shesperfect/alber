import React from 'react';

import { BasePrimitive, PrimitiveProps } from '../base';

import './Clock.scss';

interface ClockProps extends PrimitiveProps {

}

export class Clock extends React.Component<ClockProps, any> {
  componentDidMount() {}

  render() {
    const { left, top } = this.props;

    return (
      <BasePrimitive left={ left } top={ top }>
        <div className="clock-wrapper">Clock</div>
      </BasePrimitive>
  );
  }
}
