import React from 'react';
import { observer, inject } from 'mobx-react';
import SessionStore from '../../store/SessionStore';
import './Login.css';

@inject('sessionStore')
@observer class Login extends React.Component {
  
  state: {
    email: string;
    password: string;
    error: string|null;
  };

  get injectedProps() {
    return this.props as {
      sessionStore: SessionStore;
    };
  }

  constructor(props: {}) {
    super(props);
    this.state = { email: '', password: '', error: null };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleInputChange(event: React.SyntheticEvent<HTMLInputElement>) {
    const element = event.target as HTMLInputElement;
    const { name, value } = element;
    this.setState({ [name]: value });
  }

  onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const { email, password } = this.state;
    const { sessionStore } = this.injectedProps;
    sessionStore.login(email, password);
  }

  render() {
    const { sessionStore } = this.injectedProps;

    return (
      <div className="container">
        <h1 className="title is-1 has-text-centered">Villa Helena</h1>
        <form className="box LoginForm" onSubmit={this.onSubmit}>

          {sessionStore.errorMessage && (
            <article className="message is-danger">
              <div className="message-body">
                {sessionStore.errorMessage}
              </div>
            </article>
          )}

          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input 
                onChange={this.handleInputChange}
                name="email"
                className="input" 
                type="email" 
                placeholder="user@email.com"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input
                onChange={this.handleInputChange}
                name="password"
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