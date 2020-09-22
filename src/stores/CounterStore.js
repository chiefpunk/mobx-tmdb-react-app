import { observable, action, reaction } from 'mobx';

export class CounterStore {
    @observable count = 10;

    @action handleInc = () => {
        this.count++;
    }
    @action handleDec = () => {
        this.count--;
    }
}

export default new CounterStore();
