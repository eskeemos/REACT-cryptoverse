import React from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import 'antd/dist/antd.css';
import reactDom from "react-dom";
import App from './App.js';

reactDom.render( 
  <Router>
    <App />
  </Router>, 
  document.getElementById('root')
);