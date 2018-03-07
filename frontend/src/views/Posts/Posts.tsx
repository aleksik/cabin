import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { Link } from 'react-router-dom';

import SessionStore from '../../store/SessionStore';

interface InjectedProps {
  sessionStore: SessionStore;
}

@inject('sessionStore')
@observer
class PostsView extends React.Component {
  
  get injectedProps() {
    return this.props as InjectedProps;
  }
  
  render() {

    const { sessionStore } = this.injectedProps;

    return (
      <>
        <div>
          {
            sessionStore.user ? sessionStore.user.email : 
            <Link to="/login">Log in</Link>
          }
        </div>
      </>
    );
  }
}

export default PostsView;