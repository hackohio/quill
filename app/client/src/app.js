import React from 'react';
import ReactDOM from 'react-dom';

import RootContainer from './RootContainer.js'

const render = Component => {
  ReactDOM.render(
    <Component />,
    document.getElementById('app')
  );
};

render(RootContainer);

if (module.hot) {
  module.hot.accept('./RootContainer.js', () => {
    const RootContainer = require('./RootContainer.js').default;
    render(RootContainer);
  });
}