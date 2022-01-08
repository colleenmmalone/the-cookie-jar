import ReactDOM from 'react-dom';
import React from 'react';

import axios from 'axios';
import Home from './Home';

export default function Logout(){
    const logoutAPI = ("http://3.87.75.177:8081/logins/logout");
    axios.get(logoutAPI)
              .then(response => response) 
              .then(logoutUser())
              .catch(err => {
                  console.log("Error occured", err);
              });
  }


  function logoutUser(){
    document.getElementById("loggedInUser").innerHTML = "Guest";
    ReactDOM.render(
        <React.StrictMode>
          <Home />
        </React.StrictMode>,
        document.getElementById('main')
      );
  }