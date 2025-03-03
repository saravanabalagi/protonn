import React from 'react';
import ReactDOM from 'react-dom';

import {Provider} from 'react-redux';
import store from './store';

import './index.css';
import 'prismjs/themes/prism.css';
import App from './components/app/app';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>), document.getElementById('root'));
registerServiceWorker();
