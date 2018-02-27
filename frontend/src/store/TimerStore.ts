import { observable } from 'mobx';

export default class TimerStore {
  @observable timer = 0;

  constructor() {
    setInterval(() => { this.timer += 1; }, 1000);
  }

  resetTimer() {
    this.timer = 0;
  }
}