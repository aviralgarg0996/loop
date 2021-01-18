import "core-js/stable";
import "regenerator-runtime/runtime";
import 'tslib';
import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';
import * as serviceWorker from './serviceWorker';
import App from './App';
import './assets/styles.css'
import LoadercScreen from './layouts/LoaderScreen';

ReactDOM.render( <div>
    <App />  
  </div>, document.getElementById('root'));

serviceWorker.unregister();
