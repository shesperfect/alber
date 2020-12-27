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
  }

  componentDidMount() {
    document.addEventListener('click', this.clickHandler.bind(this), true);
    document.addEventListener('click', (e: any) => {
      const action = e.target.dataset.action;

      switch (action) {
        case 'remove':
        this.focus();
        e.stopPropagation();
        break;
      }
    });
    document.addEventListener('keyup', this.keyboardHandler.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.clickHandler, true);
    document.removeEventListener('keyup', this.keyboardHandler);
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

  private clickHandler(e: any) {
    const action = e.target.dataset.action;

    switch (action) {
      case 'add': case 'focus':
        this.blur();
        break;
      case 'remove':
        // this.focus();
        // e.stopImmediatePropagation();
        // break;
    }
  }

  private keyboardHandler(e: any) {
    if(e.key === "Escape") {
      if (this.state.focused) {
        e.preventDefault();
        console.log(this);
        e.stopImmediatePropagation();
        this.blur()
      }
    }
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
