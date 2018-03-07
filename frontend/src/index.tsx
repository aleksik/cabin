import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Container from './views/Container';
import PostsView from './views/Posts';
import LoginView from './views/Login';
import NavigationView from './views/Navigation';

import store from './store';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(
  <Provider {...store}>
    <Router>
      <Route 
        path="/" 
        render={({ location }) => (
          <>
            <NavigationView />
            <Container location={location}>
              <Route exact={true} path="/" component={PostsView} />
              <Route exact={true} path="/login" component={LoginView} />
            </Container>
          </>
        )}
      />
    </Router>
  </Provider>,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();
