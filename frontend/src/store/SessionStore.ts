import { User } from 'firebase';
import { observable, action, useStrict } from 'mobx';
import firebase from '../firebase';

useStrict(true);

class SessionStore {
  @observable user: User | null;
  @observable isPending: boolean;
  @observable errorMessage: string|null;

  constructor() {
    this.isPending = true;
    this.user = null;
    this.errorMessage = null;
    
    firebase.auth.onAuthStateChanged(user => {
      this.setUser(user);
      this.setPending(false);
      this.setErrorMessage(null);
    });
  }

  getToken(): Promise<string> {
    if (firebase.auth.currentUser) {
      return firebase.auth.currentUser.getToken();
    }
    return Promise.reject('Not logged in');
  }

  login(email: string, password: string) {
    this.setPending(true);
    this.setUser(null);
    firebase.auth.signInWithEmailAndPassword(email, password)
      .catch(error => {
        this.setPending(false);
        this.setErrorMessage('Wrong email or password.');
      });
  }

  @action logout() {
    firebase.auth.signOut()
      .then(() => this.clearSession())
      .catch(() => this.clearSession());
  }

  @action clearSession() {
    this.user = null;
  }

  @action setUser(user: User | null) {
    this.user = user;
  }

  @action setPending(isPending: boolean) {
    this.isPending = isPending;
  }

  @action setErrorMessage(errorMessage: string|null) {
    this.errorMessage = errorMessage;
  }
}

export default SessionStore;