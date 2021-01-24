import React from 'react';
import ReactDOM from 'react-dom';

import RootContainer from './RootContainers/RootContainer.js'

const render = Component => {
  ReactDOM.render(
    <Component />,
    document.getElementById('app')
  );
};

render(RootContainer);

if (module.hot) {
  module.hot.accept('./RootContainers/RootContainer.js', () => {
    const RootContainer = require('./RootContainers/RootContainer.js').default;
    render(RootContainer);
  });
}