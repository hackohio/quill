import React from 'react';
import ReactDOM from 'react-dom';

import { AppContainer } from 'react-hot-loader';
import RootContainer from './RootContainer.js'

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
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