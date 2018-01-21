import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './services/registerServiceWorker';
import { BrowserRouter } from "react-router-dom";

ReactDOM.render((
    <BrowserRouter 
    // basename="/home"
    > 
        <App />
    </BrowserRouter>
), document.getElementById('root'));
registerServiceWorker();
