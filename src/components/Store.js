import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Button from 'react-bootstrap/Button';

import InventoryMaster from "./InventoryMaster";
import Cart from './Cart.js';

import "../css/Store.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/Cart.css'

export default function Store() {
    const loginsAPI = ("http://3.87.75.177:8081/logins/");
    const inventoryUrl = ("http://3.87.75.177:8081/inventory/");

    const [item, setItems] = useState([]);
    const [basket, setBasket] = useState([]);
    const [cartPage, setCartPage] = useState(false);
    const [userStatus, setUserStatus] = useState("");

    useEffect(function inventoryFunc() {
        axios.get(inventoryUrl)
            .then(response => response)
            .then(({ data: item }) => {
                setItems(item)
            });
    }, []);

    // render inventory items
    useEffect(function effectFunction() {
        axios.get(loginsAPI + "whoisloggedin")
            .then(response => response)
            .then(({ data }) => { currentUser(data) })
            .then(({ data }) => { setUserStatus = data.status; })
            .catch(err => {
                console.log("Error occured", err);

            });
    }, []);

    const addToCart = (el) => {
        const exist = basket.find(x => x.itemid === el.itemid);
        // checks if item exist, if so increment quantity
        if (exist) {
            setBasket(basket.map((x) => x.itemid === el.itemid ? { ...exist, quantity: exist.quantity + 1 } : x
            )
            );
        } else {
            // else add item and set initial quantity to 1
            setBasket([...basket, { ...el, quantity: 1 }]);
        }
    }

    let inventoryItem = item.map(function (el) {
        console.log(userStatus);
        //if statement here about being CS or EMP
        //colleen could not get this to render right
        const isCS = () => {
            //           if(userStatus === 'EMPLOYEE'){
            //                  return(<></>);
            //              }else{
            //          return(<td><Button onClick={()=> {addToCart(el)}} variant="info">Add To Cart</Button></td>);
        }
        //       }

        return (
            <tr key={el.itemid}>
                <td>
                    <img className='thumb' src={require('./pictures/' + el.storeImg)} alt="cakeimage" />
                </td>
                <td>{el.items}</td>
                <td>${el.price}</td>
                <td><Button onClick={() => { addToCart(el) }} variant="info">Add To Cart</Button></td>
            </tr>
        )

    })

    return (
        <>
            <h3 class="pageTitle">Store</h3>
            <div id="empBtnDiv">
                <button onClick={() => setCartPage(!cartPage)}>{cartPage ? ("Return to store") : ("Checkout")}</button><br />
            </div>
            <br />
            <span id="cart">
                <table class="table table-sm">
                    <tbody>
                        {cartPage ? (<Cart basket={basket} />) : (inventoryItem)}
                    </tbody>
                </table>
            </span>
        </>
    )
}

function updateStore() {
    ReactDOM.render(
        <React.StrictMode>
            <InventoryMaster />
        </React.StrictMode>,
        document.getElementById('main')
    );
}

function isEmployee() {
    ReactDOM.render(
        <button id="emp" onClick={updateStore}>Update Inventory</button>,
        document.getElementById('empBtnDiv')
    );
}

function currentUser(data) {
    console.log(data.firstName);
    if (data.firstName === undefined) { //if no one is logged in
        document.getElementById("thisUser").innerHTML = "";
    } else {
        console.log(data.status);
        // setUSerStatus = data.status;
        if (data.status == 'EMPLOYEE') {
            isEmployee();

        }
    }
}