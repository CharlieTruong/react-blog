import React from 'react';
import ReactDOM from 'react-dom';

import injectTapEventPlugin from 'react-tap-event-plugin';

import routes from './components/routes'

import '../node_modules/normalize-css/normalize.css'
import '../css/base.css'

injectTapEventPlugin();
ReactDOM.render(routes, document.getElementById('app'));