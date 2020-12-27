import React from 'react';

import './BasePrimitive.scss';

export interface PrimitiveProps {
  top: number;
  left: number;
}

export interface PrimitiveState {
  focused: boolean;
}

export class BasePrimitive extends React.Component<PrimitiveProps, PrimitiveState> {
  static defaultProps = {
    top: 0,
    left: 0,
  };

  constructor(props: PrimitiveProps) {
    super(props);

    this.state = {
      focused: true,
    };
  }

  focus() {
    this.setState(() => ({ focused: true }));
  }

  blur() {
    this.setState(() => ({ focused: false }));
  }

  remove() {}

  render() {
    const { top, left } = this.props;

    return (
      <div
        className={ `wrapper ${ this.state.focused ? 'focused' : '' }` }
        style={{ top, left: `${left}%` }}>
        { this.props.children }
        <div className="buttons">
          <button onClick={ () => this.remove() } className="btn remove-btn">Remove</button>
          <button onClick={ () => this.focus() }
                  className="btn focus-btn"
                  disabled={ this.state.focused }>{ this.state.focused ? 'Focused' : 'Focus' }
          </button>
        </div>
      </div>
    );
  }
}
