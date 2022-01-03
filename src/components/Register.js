import ReactDOM from 'react-dom';
import React from 'react';
import Home from './Home';

export default function Register(){
    return(
        <>
        <h3>Register</h3>
         <p>Enter your details for delicious cookies!</p>
            <br/>
        {/*<form>*/}

           
            <input type="text" placeholder="First Name" id="firstName"></input><br/>
            <input type="text" placeholder="Last Name" id="lastName"></input><br/><br/>
            <input type="text" placeholder="Email" id="email"></input><br/><br/>
            <input type="password" placeholder="Password" id="pswd"></input><br/>
            <input type="password" placeholder="Confirm Password" id="pswd2"></input><br/><br/>
            <button id="regSubmit" onClick={submit}>Register</button><br/>
        {/*</form>*/}
        <p>Already a registered user? Login <a href="javascript:void(0)" onClick={login}>here</a></p>
        <br/><br/>
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

function submit(){
    alert("Axios method needs to be written");
}