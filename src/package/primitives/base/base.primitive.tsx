import React from 'react';

import './BasePrimitive.scss';

export interface PrimitiveProps {
  top: number;
  left: number;
}

export class BasePrimitive extends React.Component<PrimitiveProps, any> {
  render() {
    const { top, left } = this.props;

    return (
      <div className="wrapper" style={{ top, left }}>
        { this.props.children }
        <button className="remove-btn">Remove</button>
        <button className="focus-btn">Focus</button>
      </div>
    );
  }
}
