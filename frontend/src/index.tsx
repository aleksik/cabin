import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './components/App';
import Hello from './components/App/Hello';
import store from './store';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(
  <Provider {...store}>
    <Router>
      <div>
        <Route exact={true} path="/" component={App} />
        <Route exact={true} path="/hello" component={Hello} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();
