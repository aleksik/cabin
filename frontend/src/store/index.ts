import SessionStore from './SessionStore';

class RootStore {

  sessionStore: SessionStore;

  constructor() {
    this.sessionStore = new SessionStore();
  }
}

const rootStore = new RootStore();

export default rootStore;