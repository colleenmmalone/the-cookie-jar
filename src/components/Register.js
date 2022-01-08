import ReactDOM from 'react-dom';
import React, { useState, useEffect } from "react";
import axios from 'axios';
import Home from './Home';
import Store from './Store';

export default function Register(){
    const loginsAPI = ("http://3.87.75.177:8081/logins/");  
    const [name1, setFirstName] = useState('');
    const [name2, setLastName] = useState('');
    const [emailin, setEmail] = useState('');
    const [pswd1, setPswd] = useState('');
    const [pswd2, setPswd2] = useState('');

    function submit(){

        if(pswd1 === pswd2){
            //alert("password matches");
            console.log(name1);
            console.log(name2);
            console.log(emailin);
            console.log(pswd1);
                axios.post(loginsAPI+"register",{
                        firstName: name1,
                        lastName: name2,
                        email: emailin,
                        pswd: pswd1,
                        status: "CUSTOMER"
                })
                .then(response => response)
                .then(({data}) => {
                    didItWork(data)})
                    .catch(err => {
                        console.log("Error occured", err);

                    });
            
        }else{
            document.getElementById("infoBar").innerHTML = "passwords do not match";
        }
    
    }
    return(
        <>
        <h3>Register</h3>
         <p>Enter your details for delicious cookies!</p>
            <br/>
            <div id="regForm">

            First Name:<input type="text" placeholder="First Name" onChange={e => setFirstName(e.target.value)}></input><br/>
            Last Name:<input type="text" placeholder="Last Name" onChange={e => setLastName(e.target.value)}></input><br/><br/>
            Email:<input type="text" placeholder="Email" onChange={e => setEmail(e.target.value)}></input><br/><br/>
            Password:<input type="password" placeholder="Password" onChange={e => setPswd(e.target.value)}></input><br/>
            Confirm Password:<input type="password" placeholder="Confirm Password" onChange={e => setPswd2(e.target.value)}></input><br/><br/>
            </div>
            <button id="regSubmit" onClick={submit}>Register</button><br/>

        <p>Already a registered user? Login <a href="javascript:void(0)" onClick={login}>here</a></p>
        <br/>
        <p id="infoBar"></p>
        <br/>
        </>
    )
}


function login(){
    ReactDOM.render(
        <React.StrictMode>
          <Home/>
        </React.StrictMode>,
        document.getElementById('main')
      );
}

function didItWork(data){
    if (data.firstName === undefined){
        document.getElementById("infoBar").innerHTML = "This email is already associated with an account<br/>Please login"
    }else{
        document.getElementById("loggedInUser").innerHTML = data.firstName+" "+data.lastName;
        ReactDOM.render(
            <React.StrictMode>
              <Store />
            </React.StrictMode>,
            document.getElementById('main')
          );
    }
}