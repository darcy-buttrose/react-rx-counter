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

function intent(interactions) {
  let decrement$ = interactions.get(RootInteractions.decrement).map(() => count => count -= 1);
  let increment$ = interactions.get(RootInteractions.increment).map(() => count => count += 1);
  return Rx.Observable.merge(decrement$,increment$);
}

function model(actions$) {
  return actions$.startWith(0).scan((count:number,action:Function) => action(count));
}

function view(interactions,counter$) {
  const {
    increment,
    decrement
  } = interactions.bindListeners(RootInteractions);
  
  const viewObservable = counter$.map((count) => 
    <div>
      <h2>count is : {count}</h2>
      <Counter  count={count}
                onIncrement={increment}
                onDecrement={decrement} />
    </div>
  );
  
  return viewObservable;
}

const Root = component('Root',(interactions) => {
  return view(interactions,model(intent(interactions)));
});

ReactDOM.render(
  <Root />,
  document.querySelector('#app')
);
