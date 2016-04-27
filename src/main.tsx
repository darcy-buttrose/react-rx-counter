///<reference path="./typings.d.ts" />
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Rx from 'rx';
import {component} from 'cycle-react';
import Counter from './Counter';

const RootInteractions = {
  increment : 'onIncrement',
  decrement : 'onDecrement'
};

const Root = component('Root',(interactions) => {
  
  const {
    increment,
    decrement
  } = interactions.bindListeners(RootInteractions);
  
  let decrement$ = interactions.get(RootInteractions.decrement).map(() => -1);
  let increment$ = interactions.get(RootInteractions.increment).map(() => +1);
  let actions$ = Rx.Observable.merge(decrement$,increment$);
  let counter$ = actions$.startWith(0).scan((x:number,y:number) => x+y);
  
  const viewObservable = counter$.map((count) => 
    <div>
      <h2>count is : {count}</h2>
      <Counter  count={count}
                onIncrement={increment}
                onDecrement={decrement} />
    </div>
  );
  
  return viewObservable;
});

ReactDOM.render(
  <Root />,
  document.querySelector('#app')
);
