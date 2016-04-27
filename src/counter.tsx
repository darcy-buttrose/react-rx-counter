///<reference path="./typings.d.ts" />
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Rx from 'rx';
import {component} from 'cycle-react';

const CounterInteractions = {
  increment : 'onIncrement',
  decrement : 'onDecrement'
}

const Counter = component('Counter', (interactions, props) => {
  
  const events = {
    onIncrement: interactions.get(CounterInteractions.increment),
    onDecrement: interactions.get(CounterInteractions.decrement)
  }
  
  const {
    increment,
    decrement
  } = interactions.bindListeners(CounterInteractions);
  
  const viewObservable = props.get('count').map((count) => 
      <div>
          <button onClick={decrement}>-</button>
          {count}
          <button onClick={increment}>+</button>
      </div>
  );
  
  return {
    view: viewObservable,
    events: events
  }
});

export default Counter;