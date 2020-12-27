import React from 'react';

import { BasePrimitive, PrimitiveProps } from '../base';

import './Window.scss';

interface WindowProps extends PrimitiveProps {}

interface WindowState {
  src: string;
  interval: number;
  enabled: boolean;
  loading: boolean;
}

export class Window extends React.Component<WindowProps, WindowState> {
  private timerId: number;

  constructor(props: WindowProps) {
    super(props);

    this.state = {
      src: '',
      interval: 5,
      enabled: true,
      loading: true,
    };
  }

  componentDidMount() {
    fetch(`https://source.unsplash.com/300x150/?beach`).then((response) => {
      this.setState(() => ({
        src: response.url,
        loading: false,
      }));
    });
  }

  update() {
    if (this.state.enabled) {
      this.setState(() => ({ loading: true } ));

      fetch(`https://source.unsplash.com/300x150/?beach`).then((response) => {
        this.setState(() => ({
          src: response.url,
          interval: 5,
          enabled: false,
          loading: false,
        }));
      });

      this.timerId = window.setInterval(() => {
        this.setState(state => ({ interval: state.interval - 1 }));

        if (this.state.interval === 0) {
          this.setState(() => ({ enabled: true }));
          window.clearInterval(this.timerId)
        }
      }, 1000);
    }

  }

  render() {
    const { left, top, index, onRemove } = this.props;

    return (
      <BasePrimitive left={ left } top={ top } index={ index } onRemove={ onRemove }>
        <div className={ `window-wrapper ${!this.state.enabled ? 'disabled' : ''}` } onClick={ () => this.update() }>
          <img src={ this.state.src } alt="" />

          { this.state.loading && (<div className="loader">Loading...</div>) }
          { !this.state.enabled && (<span className="interval">{ this.state.interval }</span>) }
        </div>
      </BasePrimitive>
    );
  }
}
