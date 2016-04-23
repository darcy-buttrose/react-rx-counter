///<reference path="./typings.d.ts" />
import makeModel from './model/counter';
import makeView from './view/counter';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {component} from 'cycle-react';

const Root = component(
  'Root',
  (interactions) => makeView(interactions, makeModel(interactions))
);

ReactDOM.render(
  <Root />,
  document.querySelector('app')
);
