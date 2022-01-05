//import { render } from "@testing-library/react";
//import React, { useState } from "react";
import InventoryMaster from "./InventoryMaster";
import UploadAndDisplayImage from "./UploadAndDisplay";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import GenerateTable from "./GenerateTable";
import axios from "axios";
import "../css/Store.css";
//import UpdateInventory from "./UpdateInventory";



export default function Store(){
    const loginsAPI = ("http://localhost:8081/logins/");    
 

    useEffect(function effectFunction() {
        axios.get(loginsAPI+"whoisloggedin")
            .then(response => response) 
            .then(({data}) => {
                currentUser(data)})
            .catch(err => {
                console.log("Error occured", err);

            });
    }, []);


  function currentUser(data){
    console.log(data.firstName);
    if(data.firstName === undefined){ //if no one is logged in
        document.getElementById("thisUser").innerHTML = "";
    }else{
        document.getElementById("thisUser").innerHTML = data.firstName+ " is logged in!";
        console.log(data.status);
        if(data.status === 'EMPLOYEE'){
            isEmployee();
        }
    }
}

    return(
        <>
        
        <h3 class="pageTitle">Store</h3>
        <h5 id="thisUser"></h5>
        <div id="empBtnDiv"></div>


{/*         <table className="inventory-table">
            <tbody>
                <tr>
                <th>Name:</th>
                <th>Quantity</th>
                <th>Price:</th>
                </tr>
            </tbody>
        </table> */}

        <div id='storeDisplay'>
            <GenerateTable />

        </div>
        


        
        </>
    )
}


function updateStore(){
    ReactDOM.render(
        <React.StrictMode>
         <InventoryMaster />
        </React.StrictMode>,
        document.getElementById('main')
      );
}


function isEmployee(){
    ReactDOM.render(
        <button id="emp" onClick={updateStore}>Update Inventory</button>,
        document.getElementById('empBtnDiv')
    );
}
