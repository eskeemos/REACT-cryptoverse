import React from "react";
import { Provider } from "react-redux";
import store from './app/store';
import { BrowserRouter as Router } from 'react-router-dom';
import 'antd/dist/antd.css';
import reactDom from "react-dom";
import App from './App.js';

reactDom.render( 
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>, 
  document.getElementById('root')
);