import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";
import { createBrowserHistory } from 'history';

const history = createBrowserHistory({
  basename: 'base-name'
}) 

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router history={history} basename={process.env.PUBLIC_URL}>
      <App />
    </Router>
  </React.StrictMode>
);
