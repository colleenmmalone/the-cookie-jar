import ReactDOM from 'react-dom';
import React, { useState, useEffect } from "react";
import "../css/Home.css";



import logo from './logo.svg';

import Register from "./Register";
import Store from "./Store";
import axios from 'axios';

export default function Home(){

    const loginsAPI = ("http://localhost:8081/logins/");    
    const [emailin, setEmail] = useState('');
    const [pswdin, setPswd] = useState('');

    useEffect(function effectFunction() {
        axios.get(loginsAPI+"whoisloggedin")
            .then(response => response) 
            .then(({data}) => {
                currentUser(data)})
            .catch(err => {
                console.log("Error occured", err);
            });
    }, []);

    function submit(){

    let emailVer = emailin.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/gi);
  //  let pswdVer = pswdin.match(/^(?=[0-9])(?=[a-zA-Z])([a-zA-Z0-9]+)$/gi);
  //  console.log("pswd " +pswdVer);
    console.log("email "+emailVer);
    if(emailin.length === 0 || pswdin.length === 0){
        document.getElementById("thisUser").innerHTML = "Fields cannot be empty";
    }else{
        axios.post(loginsAPI+"login", {
            "email": emailin,
            "pswd": pswdin
        })
            .then(response => response)
            .then(({data}) => {
                submitted(data)
                .then(console.log(data))
            .catch(err => {
                console.log("Error occured", err);
                document.getElementById("nameP").innerHTML = "An error occurred. Please try again";
            })
            });
        }
    }

    return(
        <>
        <h3 class="pageTitle">Login</h3>
        <form className="login-form">
            <input className="login-form" id="email-input" classtype="text" placeholder="Email" onChange={e => setEmail(e.target.value)} noValidate></input><br/>
            <input className="login-form" id="password-input" type="password" placeholder="Password" onChange={e => setPswd(e.target.value)} noValidate></input><br/>
            <button className="btn btn-info" id="loginSubmit" type="button" onClick={submit}>Submit</button><br/>
        </form>
        <p>Not a registered user? Create an Account <a href="javascript:void(0)" onClick={register}>here</a></p><br/>
        <h5 id="thisUser"></h5><br/>
        
<br/>
        <img src={logo} className="App-logo" alt="logo" /><br/><br/>
        <p>Come to the dark side; we have cookies</p>

        </>
    )
}
function register(){
    ReactDOM.render(
        <React.StrictMode>
          <Register/>
        </React.StrictMode>,
        document.getElementById('main')
      );
}

function currentUser(data){
    console.log(data.firstName);
    if(data.firstName === undefined){ //if no one is logged in
        document.getElementById("thisUser").innerHTML = "";
    }else{
        document.getElementById("thisUser").innerHTML = data.firstName+ " is already logged in!";
    }
}

function submitted(data){
    console.log(data.firstName);
    if(data.firstName === undefined){
        document.getElementById("thisUser").innerHTML = "login credentials are invalid. Please try again";
    }else{
        document.getElementById("loggedInUser").innerHTML = data.firstName+" "+data.lastName;
    
        //userIsLoggedIn();
        ReactDOM.render(
            <React.StrictMode>
              <Store />
            </React.StrictMode>,
            document.getElementById('main')
          );

       // 
    }
}
