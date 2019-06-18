import './Utils/Polyfill.js';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import $ from 'jquery';
import './Utils/FAImport.js';
import './Utils/Polyfill.js';
import './css/nc.css';
import './css/style.css';
window.jQuery = $;
window.$ = $;

//ReactDOM.render((<BrowserRouter basename="/syslogs/"><App /></BrowserRouter>), document.getElementById('root'));
ReactDOM.render((<BrowserRouter basename={'/voters'}><App /></BrowserRouter>), document.getElementById('root'));
registerServiceWorker();
