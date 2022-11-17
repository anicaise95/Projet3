import React from 'react';
import ReactDOM from 'react-dom/client';
import './asset/styles/index.scss';
import App from './App.jsx';
//import reportWebVitals from './reportWebVitals';
import { ApiContext } from './contexts/AppContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApiContext.Provider value="https://restapi.fr/api/recipes">
    <App />
  </ApiContext.Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
