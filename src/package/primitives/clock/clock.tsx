import React from 'react';

import { BasePrimitive, PrimitiveProps } from '../base';

import './Clock.scss';

interface ClockProps extends PrimitiveProps {}

interface ClockState {
  interval: number;
}

export class Clock extends React.Component<ClockProps, ClockState> {
  private intervalId: number;

  constructor(props: ClockProps) {
    super(props);

    this.state = {
      interval: 5 * 60 * 1000,
    };
  }

  componentDidMount() {
    this.intervalId = window.setInterval(() => {
      this.setState(state => ({ interval: state.interval - 1000 }));

      if (this.state.interval <= 0) window.clearInterval(this.intervalId);
    }, 1000);
  }

  componentWillUnmount() {
    window.clearInterval(this.intervalId);
  }

  render() {
    const { left, top } = this.props;

    return (
      <BasePrimitive left={ left } top={ top }>
        <div className="clock-wrapper">{ this.state.interval / 1000 } sec</div>
      </BasePrimitive>
  );
  }
}
