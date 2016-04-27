///<reference path="./typings.d.ts" />
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Rx from 'rx';
import {component} from 'cycle-react';
import Counter from './Counter';

const Root = component('Root',(interactions) => {
  return Rx.Observable.just(0).map((count) =>
    <div>
      <Counter />
    </div>
  );
});

ReactDOM.render(
  <Root />,
  document.querySelector('#app')
);
