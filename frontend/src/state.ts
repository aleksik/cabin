import { observable } from 'mobx';

export default class State {
  @observable timer = 0;

  constructor() {
    setInterval(() => { this.timer += 1; }, 1000);
  }

  resetTimer() {
    this.timer = 0;
  }
}
