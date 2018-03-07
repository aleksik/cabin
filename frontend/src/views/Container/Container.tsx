import React from 'react';
import { observer, inject, } from 'mobx-react';
import SessionStore from '../../store/SessionStore';
import Spinner from '../../components/Spinner';
import './Container.css';

interface Props {
  // tslint:disable-next-line: no-any
  location?: any;
  // tslint:disable-next-line: no-any
  children?: any;
  // tslint:disable-next-line: no-any
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