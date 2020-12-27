import React from 'react';

import './BasePrimitive.scss';

export interface PrimitiveProps {
  top: number;
  left: number;
  index: number,
  onRemove: () => void,
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

    this.clickHandler = this.clickHandler.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.clickHandler, true);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.clickHandler, true);
  }

  private clickHandler(e: any) {
    const action = e.target.dataset.action;

    switch (action) {
      case 'add': case 'focus':
        this.blur();
        break;
      case 'remove':
        // some code here...
        break;
    }
  }

  focus() {
    this.setState(() => ({ focused: true }));
  }

  blur() {
    this.setState(() => ({ focused: false }));
  }

  remove() {
    this.props.onRemove();
  }

  render() {
    const { top, left } = this.props;

    return (
      <div
        className={ `wrapper ${ this.state.focused ? 'focused' : '' }` }
        style={{ top, left: `${left}%` }}>
        { this.props.children }
        <div className="buttons">
          <button onClick={ () => this.remove() }
                  className="btn remove-btn"
                  data-action="remove">Remove</button>
          <button onClick={ () => this.focus() }
                  className="btn focus-btn"
                  data-action="focus"
                  disabled={ this.state.focused }>{ this.state.focused ? 'Focused' : 'Focus' }
          </button>
        </div>
        <span className="number">{ this.props.index }</span>
      </div>
    );
  }
}
