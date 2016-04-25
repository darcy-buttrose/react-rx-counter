///<reference path="./typings.d.ts" />
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Rx from 'rx';
import {component} from 'cycle-react';

const Root = component('Root', (interactions) => {
  let decrement$ = interactions.get('decrement').map(() => -1);
  let increment$ = interactions.get('increment').map(() => +1);
  let actions$ = Rx.Observable.merge(decrement$,increment$);
  let counter$ = actions$.startWith(0).scan((x:number,y:number) => x+y);
  
  return counter$
    .map((count) => (
      <div>
          <button onClick={interactions.listener('decrement')}>-</button>
          {count}
          <button onClick={interactions.listener('increment')}>+</button>
      </div>
    ));
});

ReactDOM.render(
  <Root />,
  document.querySelector('#app')
);
