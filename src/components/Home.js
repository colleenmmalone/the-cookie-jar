import ReactDOM from 'react-dom';
import React, { useState, useEffect } from "react";

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

        axios.post(loginsAPI+"login",{
            "email": emailin,
            "pswd": pswdin
        })

            .then(response => response)
            .then(({data}) => {
                submitted(data)
                .then(console.log(data))
            .catch(err => {
                console.log("Error occured", err);
            })
            });
    
    }


    return(
        <>
        <h3 class="pageTitle">Login</h3>
        {/*<form>*/}
            <input type="text" placeholder="Email" onChange={e => setEmail(e.target.value)}></input><br/>
            <input type="password" placeholder="Password" onChange={e => setPswd(e.target.value)}></input><br/>
            <button id="loginSubmit" onClick={submit}>Submit</button><br/>

        {/*</form>*/}
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

function userIsLoggedIn(){
    ReactDOM.render(
        <React.StrictMode>
          <Store />
        </React.StrictMode>,
        document.getElementById('main')
      );
}


function currentUser(data){
    console.log(data.firstName);
    if(data.firstName === undefined){ //if no one is logged in
        document.getElementById("thisUser").innerHTML = "";
    }else{
        document.getElementById("thisUser").innerHTML = data.firstName+ " is logged in!";
    }
}

function submitted(data){
    console.log(data.firstName);
    if(data.firstName === undefined){
        document.getElementById("thisUser").innerHTML = "login credentials are invalid. Please try again";
    }else{
        
        userIsLoggedIn();

       // document.getElementById("thisUser").innerHTML = data.firstName+ " is already logged in!";
    }
}