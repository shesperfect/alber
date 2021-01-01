import React from 'react';

import { random, PrimitiveFactory } from './package';

import './App.scss';

interface AppState {
  instances: any[],
}

export class App extends React.Component<any, AppState> {
  private factory = new PrimitiveFactory();

  private buttonRef = React.createRef<HTMLButtonElement>();

  constructor(props: any) {
    super(props);

    this.state = { instances: [] };
  }

  componentDidMount() {
    this.buttonRef.current?.addEventListener('click', () => {
      const primitive = this.factory.resolve({
        left: random(200, window.innerWidth - 200),
        top: random(200, window.innerHeight - 200),
        index: this.state.instances.length,
      });

      this.setState((state: AppState) => ({
        instances: [...state.instances, primitive]
      }));
    }, true);


  }

  render() {
    return (
      <div className="container">
        { this.state.instances.map((component, index) => (
          <React.Fragment key={ index }>
            { component }
          </React.Fragment>))
        }
        <button ref={ this.buttonRef } className="add-button" data-action="add">Add primitive</button>
      </div>
    );
  }
}

export default App;
