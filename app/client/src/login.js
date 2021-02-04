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

$('ui.form')
    .form({
        fileds:{
            email:{
                identifier: 'email',
                rules:[
                    {
                        type: 'empty',
                        prompt: 'Please enter your school email'
                    }
                ]
            },
            password:{
                identifier: 'password',
                rules:[
                    {
                        type    : 'empty',
                        prompt  : 'Please enter a strong password'
                    },
                    {
                        type    : 'minLength[6]',
                        prompt  : 'Your password must be at least {ruleValue} characters'
                    }
                ]
            }
        }
    })
;

if (module.hot) {
    module.hot.accept('./RootContainers/RootLoginContainer.js', () => {
        const RootContainer = require('./RootContainers/RootLoginContainer.js').default;
        render(RootContainer);
    });
}