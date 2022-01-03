import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import NavBar from './components/navBar'
import reportWebVitals from './reportWebVitals';
import Home from './components/Home';
import Footbar from './components/Footbar';

ReactDOM.render(
  <React.StrictMode>
    <NavBar />
  </React.StrictMode>,
  document.getElementById('navBar')
);

ReactDOM.render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>,
  document.getElementById('main')
);

ReactDOM.render(
  <React.StrictMode>
    <Footbar />
  </React.StrictMode>,
  document.getElementById('footbar')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
