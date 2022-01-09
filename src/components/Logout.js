import ReactDOM from 'react-dom';
import React from 'react';

import axios from 'axios';
import Home from './Home';

export default function Logout(){
    const logoutAPI = ("http://localhost:8081/logins/logout");
    axios.get(logoutAPI)
              .then(response => response) 
              .then(logoutUser())
              .catch(err => {
                  console.log("Error occured", err);
              });
  }


  function logoutUser(){
    ReactDOM.render(
        <React.StrictMode>
          <Home />
        </React.StrictMode>,
        document.getElementById('main')
      );
  }