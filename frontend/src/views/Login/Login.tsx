import React from 'react';
import { observer, inject } from 'mobx-react';
import SessionStore from '../../store/SessionStore';
import { Redirect } from 'react-router';

interface InjectedProps {
  sessionStore: SessionStore;
}

@inject('sessionStore')
@observer class Login extends React.Component {
  
  emailInput: HTMLInputElement | null;
  passwordInput: HTMLInputElement | null;

  get injectedProps() {
    return this.props as InjectedProps;
  }

  onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = this.emailInput && this.emailInput.value;
    const password = this.passwordInput && this.passwordInput.value;
    if (email && password) {
      const { sessionStore } = this.injectedProps;
      sessionStore.login(email, password);
    }
  }

  render() {

    // If user is logged in, redirect to /
    const { sessionStore } = this.injectedProps;
    if (sessionStore.isAuthenticated === true) {
      return <Redirect to="/" />;
    }

    return (
      <div className="container">
        <form onSubmit={this.onSubmit}>
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input 
                ref={el => this.emailInput = el}
                className="input" 
                type="text" 
                placeholder="user@email.com"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input 
                ref={el => this.passwordInput = el}
                className="input" 
                type="password" 
                placeholder="password"
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button type="submit" className="button is-link">Submit</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;