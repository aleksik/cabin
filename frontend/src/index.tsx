import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import App from './components/App';
import State from './state';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

const state = new State();

ReactDOM.render(
  <Provider state={state}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();
