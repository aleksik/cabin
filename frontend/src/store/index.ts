import TimerStore from './TimerStore';

class RootStore {

  timerStore: TimerStore;

  constructor() {
    this.timerStore = new TimerStore();
  }
}

const rootStore = new RootStore();

export default rootStore;