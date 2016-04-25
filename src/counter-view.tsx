import * as React from 'react';
import * as InteractionTypes from './interaction-types';
import Counter from './counter-component';

export default function makeView(interactions, model) {
  return model.map(counter =>
    <div>
      <Counter counter={counter}
               {...interactions.bindListeners(InteractionTypes)} />
      <hr />
      <p>Compare with <a href="https://github.com/gaearon/redux/tree/v1.0.0-rc/examples/counter">redux</a></p>
    </div>
  );
}
