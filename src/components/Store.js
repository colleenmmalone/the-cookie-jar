//import { render } from "@testing-library/react";
//import React, { useState } from "react";
import InventoryMaster from "./InventoryMaster";
import UploadAndDisplayImage from "./UploadAndDisplay";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import GenerateTable from "./GenerateTable";
import axios from "axios";
import "../css/Store.css";
import matcha from './pictures/cake_matcha.jpg';
import croissant from "./pictures/croissant.jpg";
import choc from './pictures/cake_chocolate.jpg';
import defaultImg from "./pictures/default.jpg";
import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/Cart.css'
import Button from 'react-bootstrap/Button';
import Cart from './Cart.js';
//import UpdateInventory from "./UpdateInventory";



export default function Store(){
    const loginsAPI = ("http://3.87.75.177:8081/logins/");
    
    const [item, setItems] = useState([]);

    const [basket, setBasket] = useState([]);

    const [cartPage, setCartPage] = useState(false);


    const inventoryUrl = ("http://3.87.75.177:8081/inventory/");

    useEffect(function inventoryFunc() {
        axios.get(inventoryUrl)
            .then(response=> response)
            .then(({data: item}) => {
                setItems(item)
            }); 
    }, []);
 

    // render inventory items
    useEffect(function effectFunction() {
        axios.get(loginsAPI+"whoisloggedin")
            .then(response => response) 
            .then(({data}) => {
                currentUser(data)})
            .catch(err => {
                console.log("Error occured", err);

            });
    }, []);

    const addToCart = (el) => {
        const exist = basket.find(x => x.itemid === el.itemid); 
        // checks if item exist, if so increment quantity
        if (exist) {
            setBasket(basket.map((x) => x.itemid === el.itemid ? {...exist, quantity: exist.quantity +1} : x
                )
            );
        } else {
        // else add item and set initial quantity to 1
            setBasket([...basket, {...el, quantity: 1}]);
        }
    }
    
    let inventoryItem = item.map(function(el) {
        console.log(el.storeImg);
        let imgSrc;
        // console.log(el);
/*             if (el.items === "matcha cake") {
                imgSrc = matcha;
            } else if (el.items === "chocolate cake") {
                imgSrc= choc;
            } else if (el.items=== "croissant") {
                imgSrc = croissant;
            } else {
                imgSrc = defaultImg;
            } */
        
            //if statement here about being CS or EMP
            const isCS = (
                <Button onClick={()=> {addToCart(el)}} variant="info">Add To Cart</Button>
            );

            return (
                <tr key={el.itemid}>
                <td>
                <img className='thumb' src={require('./pictures/'+el.storeImg)} alt="cakeimage"/>
                </td>
                <td>{el.items}</td>
                <td>${el.price}</td>
                <td>{isCS}</td>
                </tr>
            )   
        
    }) 

  function currentUser(data){
    console.log(data.firstName);
    if(data.firstName === undefined){ //if no one is logged in
        document.getElementById("thisUser").innerHTML = "";
    }else{
        console.log(data.status);
        if(data.status === 'EMPLOYEE'){
            isEmployee();
        }else{
            isCustomer();
        }
    }
}
    
    return(
        <>
            <h3 class="pageTitle">Store</h3>
            <h5 id="thisUser"></h5>
            <div id="empBtnDiv"></div>
            <span id="cart">
                <table class="table table-sm">
                        <tbody>
                          {cartPage ? (<Cart basket={basket}/>) : (inventoryItem)}
                        </tbody>
                    </table>
            </span>    
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

function isCustomer(){
    ReactDOM.render(
        <button onClick={() => setCartPage(!cartPage)}>{cartPage ? ("Return to store") :("Checkout")}</button>,
        document.getElementById('empBtnDiv')
    );
}