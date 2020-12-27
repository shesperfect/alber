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
      const primitive = this.factory.resolve({
        left: random(0, 80),
        top: random(0, container?.clientHeight),
        index: this.state.instances.length,
        onRemove: () => {
          const index = this.state.instances.findIndex(inst => inst === primitive);

          this.setState(state => ({
            instances: state.instances
              .filter((item, i) => index !== i),
          }));
        },
      });

      this.setState((state: AppState) => ({
        instances: [...state.instances, primitive]
      }));
    }, true);
  }

  render() {
    return (
      <div ref={ this.containerRef } className="container">
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
