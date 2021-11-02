import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './Components/mainLayout/layout/layout';
import './index.css';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Layout/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: dhttps://bit.ly/CRA-vitals
reportWebVitals();
