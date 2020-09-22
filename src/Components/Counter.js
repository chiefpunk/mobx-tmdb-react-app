import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import { inject, observer } from 'mobx-react';

@inject('CounterStore')
@observer class Counter extends Component {
  handleDec = () =>{
    this.props.CounterStore.handleDec();
  }
  handleInc = () =>{
    this.props.CounterStore.handleInc();
  }
  render() {
    return (
      <div className="App">
        <header>
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <h2>Counter</h2>
        <div>
          <p>Count: {this.props.CounterStore.count} </p>
          <button onClick={this.handleDec}> - </button>
          <button onClick={this.handleInc}> + </button>
        </div>
      </div>
    );
  }
}

export default Counter;
