import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Container from './views/Container';
import PostsView from './views/Posts';
import NavigationView from './views/Navigation';

import store from './store';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(
  <Provider {...store}>
    <Router>
      <>
        <NavigationView />
        <Container>
          <Switch>
            <Redirect exact={true} from="/" to="/posts" />
            <Route path="/posts" component={PostsView} />
          </Switch>
        </Container>
      </>
    </Router>
  </Provider>,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();
