import React from 'react';
import ReactDOM from 'react-dom';

import RootContainer from './RootContainers/RootLoginContainer.js';

const render = Component => {
    ReactDOM.render(
        <Component />,
        document.getElementById('app')
    );
};

render(RootContainer);

if (module.hot) {
    module.hot.accept('./RootContainers/RootLoginContainer.js', () => {
        const RootContainer = require('./RootContainers/RootLoginContainer.js').default;
        render(RootContainer);
    });
}