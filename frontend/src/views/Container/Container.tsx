import React from 'react';
import { observer, inject, } from 'mobx-react';
import { withRouter } from 'react-router';
import SessionStore from '../../store/SessionStore';
import Spinner from '../../components/Spinner';
import LoginView from '../../views/Login';
import './Container.css';

interface Props {
  location?: any;
  children?: any;
  sessionStore?: any;
}

interface InjectedProps {
  sessionStore: SessionStore;
}

@inject('sessionStore')
@observer
class Container extends React.Component {

  props: Props;

  get injectedProps() {
    return this.props as InjectedProps;
  }

  render() {
    const { sessionStore } = this.injectedProps;
    const { isPending, user } = sessionStore;

    // Display the login view if user is not authenticated
    if (!isPending && user === null) {
      return (
        <div className="Container section">
          <LoginView />
        </div>
      );
    }

    return (
      <div className={`Container section ${isPending && '-hasSpinner'}`}>
        {
          isPending ?
          <Spinner /> :
          this.props.children
        }
      </div>
    );
  }
}

export default withRouter<any>(Container);