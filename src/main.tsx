///<reference path="./typings.d.ts" />
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Rx from 'rx';
import {component} from 'cycle-react';
import Counter from './Counter';

ReactDOM.render(
  <div>
    <Counter />
    <Counter />
  </div>,
  document.querySelector('#app')
);
