import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/Store.css";
export default function Settings(){
    const loginsAPI = ("http://localhost:8081/logins/");    

    useEffect(function effectFunction() {
        axios.get(loginsAPI+"whoisloggedin")
            .then(response => response) 
            .then(({data}) => {
                currentUser(data)
            .catch(err => {
                console.log("Error occured", err);
            })
            });
    }, []);

  

    function currentUser(data){
        console.log(data.firstName);
        if(data.firstName === undefined){ //if no one is logged in
            document.getElementById("nameP").innerHTML = "No one is logged in";
        }else{
            displaySettings(data);
        }
    }


    return(
        <>
        <h3  class="pageTitle">User Settings</h3>
        <h4 id="nameP"></h4>
        <hr/>
        <h4 id="emailP"></h4>
        
        </>
    )
}

function displaySettings(data){
    document.getElementById("nameP").innerHTML = "";
    document.getElementById("nameP").append("Name: "+data.firstName+" "+data.lastName);

    document.getElementById("emailP").innerHTML = "";
    document.getElementById("emailP").append("Email: "+data.email);


}