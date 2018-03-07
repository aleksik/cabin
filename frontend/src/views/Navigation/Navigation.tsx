import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import bookIcon from '@fortawesome/fontawesome-free-solid/faBook';
import imagesIcon from '@fortawesome/fontawesome-free-solid/faImages';
import settingsIcon from '@fortawesome/fontawesome-free-solid/faCog';
import logoutIcon from '@fortawesome/fontawesome-free-solid/faSignOutAlt';

import SessionStore from '../../store/SessionStore';

import './Navigation.css';

interface InjectedProps {
  sessionStore: SessionStore;
}

@inject('sessionStore')
@observer
class Navigation extends React.Component {

  constructor(props: {}) {
    super(props);
    this.onLogoutClick = this.onLogoutClick.bind(this);
  }

  get injectedProps() {
    return this.props as InjectedProps;
  }

  onLogoutClick(event: React.SyntheticEvent<HTMLAnchorElement>) {
    event.preventDefault();
    const { sessionStore } = this.injectedProps;
    sessionStore.logout();
  }

  render() {

    const { sessionStore } = this.injectedProps;

    if (!sessionStore.user) {
      return null;
    }

    return (
      <div className="Navigation">
        <ul>
          <li>
            <Link to="/posts">
              <FontAwesomeIcon icon={bookIcon} />
            </Link>
          </li>
          <li>
            <Link to="/gallery">
              <FontAwesomeIcon icon={imagesIcon} />
            </Link>
          </li>
          <li>
            <Link to="/settings">
              <FontAwesomeIcon icon={settingsIcon} />
            </Link>
          </li>
          <li>
            <a href="#" onClick={this.onLogoutClick}>
              <FontAwesomeIcon icon={logoutIcon} />
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

export default Navigation;