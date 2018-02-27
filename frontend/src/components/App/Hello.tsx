import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { Link } from 'react-router-dom';
import State from '../../state';
import './App.css';

const logo = require('./logo.svg');

interface InjectedProps {
  state: State;
}

@inject('state') @observer
class Hello extends React.Component {

  get injected() {
    return this.props as InjectedProps;
  }

  onReset = () => {
    this.injected.state.resetTimer();
  }

  render() {
    return (
      <div className="App container">
        <div className="notification">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Hello to React</h1>
          <button onClick={this.onReset}>
            Seconds passed: {this.injected.state.timer}
          </button>
          <div>
            <Link to="/">Home</Link>
          </div>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default Hello;
