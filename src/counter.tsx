///<reference path="./typings.d.ts" />
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Rx from 'rx';
import {component} from 'cycle-react';

const CounterInteractions = {
  increment : 'onIncrement',
  decrement : 'onDecrement'
}

const Counter = component('Counter', (interactions) => {
  
  const events = {
    onIncrement: interactions.get(CounterInteractions.increment),
    onDecrement: interactions.get(CounterInteractions.decrement)
  }
  
  const {
    increment,
    decrement
  } = interactions.bindListeners(CounterInteractions);
  
  let decrement$ = events.onDecrement.map(() => -1);
  let increment$ = events.onIncrement.map(() => +1);
  let actions$ = Rx.Observable.merge(decrement$,increment$);
  let counter$ = actions$.startWith(0).scan((x:number,y:number) => x+y);
  
  const viewObservable = counter$.map((count) => 
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