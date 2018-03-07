import React from 'react';
import { observer, inject, } from 'mobx-react';
import { withRouter } from 'react-router';
import SessionStore from '../../store/SessionStore';
import Spinner from '../../components/Spinner';
import './Container.css';

interface Props {
  location?: any; // tslint:disable-line: no-any
  children?: any; // tslint:disable-line: no-any
  sessionStore?: any; // tslint:disable-line: no-any
}

interface InjectedProps {
  sessionStore: SessionStore;
}

@inject('sessionStore')
@observer
@withRouter
class Container extends React.Component {

  props: Props;

  get injectedProps() {
    return this.props as InjectedProps;
  }

  render() {
    const { sessionStore } = this.injectedProps;
    const { isPending } = sessionStore;

    return (
      <div className={`Container ${isPending && '-hasSpinner'}`}>
        {
          isPending ?
          <Spinner /> :
          this.props.children
        }
      </div>
    );
  }
}

export default Container;