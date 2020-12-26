import React, { ReactElement } from 'react';

import { random, PrimitiveFactory } from './package';

import './App.scss';

interface AppState {
  instances: ReactElement[],
}

export class App extends React.Component<any, AppState> {
  private factory = new PrimitiveFactory();

  private containerRef = React.createRef<HTMLDivElement>();
  private buttonRef = React.createRef<HTMLButtonElement>();

  constructor(props: any) {
    super(props);
    this.state = { instances: [] };
  }

  componentDidMount() {
    const container = this.containerRef.current;

    this.buttonRef.current?.addEventListener('click', () => {
      const primitive = this.factory.resolve(random(0, 80), random(0, container?.clientHeight));

      this.setState((state: AppState) => ({
        instances: [...state.instances, primitive]
      }));
    });
  }

  render() {
    return (
      <div ref={ this.containerRef } className="container">
        { this.state.instances.map((component, index) => (
          <React.Fragment key={ index }>
            { component }
          </React.Fragment>))
        }
        <button ref={ this.buttonRef } className="add-button">Add primitive</button>
      </div>
    );
  }
}

export default App;
