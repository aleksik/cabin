import { User } from 'firebase';
import { observable, action, useStrict } from 'mobx';
import firebase from '../firebase';

useStrict(true);

class SessionStore {
  @observable user: User | null;
  @observable isPending: boolean;
  @observable isAuthenticated: boolean;

  constructor() {
    this.isPending = true;
    this.isAuthenticated = false;
    this.user = null;
    
    firebase.auth.onAuthStateChanged(user => {
      this.setUser(user);
      this.setPending(false);
    });
  }

  login(email: string, password: string) {
    this.setPending(true);
    this.setUser(null);
    firebase.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    firebase.auth.signOut()
      .then(() => this.clearSession())
      .catch(() => this.clearSession());
  }

  @action clearSession() {
    this.user = null;
    this.isAuthenticated = false;
  }

  @action setUser(user: User | null) {
    this.user = user;
    this.isAuthenticated = user !== null;
  }

  @action setPending(isPending: boolean) {
    this.isPending = isPending;
  }
}

export default SessionStore;