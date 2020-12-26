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

  componentDidMount() {
    document.addEventListener('click', e => {
      console.log(e);
    });
  }

  render() {
    const { top, left } = this.props;

    return (
      <div className={ `wrapper ${ this.state.focused ? 'focused' : '' }` } style={{ top, left }}>
        { this.props.children }
        <button className="remove-btn">Remove</button>
        <button className="focus-btn">Focus</button>
      </div>
    );
  }
}
