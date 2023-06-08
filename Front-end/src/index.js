import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Authprovider } from './context/Authprovider';
import AuthApi from './utils/AuthApi';

import {  BrowserRouter as Router  } from 'react-router-dom';
const root = ReactDOM.createRoot(document.getElementById('root')); 

root.render( 
          <Authprovider> <Router>
    
             <App />
                </Router>
         </Authprovider>
);