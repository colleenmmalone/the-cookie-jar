import ReactDOM from 'react-dom';
import React, { useState, useEffect } from "react";
import axios from 'axios';
import Home from './Home';
import Store from './Store';

export default function Register(){
    const loginsAPI = ("http://localhost:8081/logins/");  
    const [name1, setFirstName] = useState('');
    const [name2, setLastName] = useState('');
    const [emailin, setEmail] = useState('');
    const [pswd1, setPswd] = useState('');
    const [pswd2, setPswd2] = useState('');

    function submit(){
        document.getElementById("infoBar").innerHTML = "";
        let emailVer = emailin.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/gi);
        let isValid = true;

        if(name1.length < 3 || name2.length < 3){ //names must be more than two characters
            isValid = false;
            document.getElementById("infoBar").append("Names must be 2 characters or more\n");
        }

        if(emailVer == null || emailin.length < 9){ //email must match email format and be longer than 8 chars
            isValid = false;
            document.getElementById("infoBar").append("Email is not a valid pattern\n");
        }

        if(pswd1 !== pswd2 || pswd1.length < 6){ //passwords must match and be longer than 5
            isValid = false;
            document.getElementById("infoBar").append("Passwords must match and be 6 characters or more\n");
        }


        if(isValid){
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
           // document.getElementById("infoBar").innerHTML = "Inputs are invalid";
        }
    
    }
    return(
        <>
        <h3 className="pageTitle">Register</h3>
         <p>Enter your details for delicious cookies!</p>
            <br/>
            <div id="regForm">

            First Name:<input type="text" placeholder="First Name" className="reg-form" onChange={e => setFirstName(e.target.value)}></input><br/>
            Last Name:<input type="text" placeholder="Last Name"  className="reg-form" onChange={e => setLastName(e.target.value)}></input><br/><br/>
            Email:<input type="text" placeholder="Email"  className="reg-form" onChange={e => setEmail(e.target.value)}></input><br/><br/>
            Password:<input type="password" placeholder="Password"  className="reg-form" onChange={e => setPswd(e.target.value)}></input><br/>
            Confirm Password:<input type="password" placeholder="Confirm Password"  className="reg-form" onChange={e => setPswd2(e.target.value)}></input><br/>
            </div>
            <button className="btn btn-info" id="regSubmit" onClick={submit}>Register</button><br/>

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