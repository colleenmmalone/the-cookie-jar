import matcha from './pictures/cake_matcha.jpg';
import choc from './pictures/cake_chocolate.jpg';
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Cart(){

    // retrieve logged in user from backend
    const [loggedInUser, setLoggedInUser] = useState([]);
    // initial state of cart should be empty
    const [cart, setCart] = useState([]);

    // test value === this should be the logged in user that we get from the backend 
    let testUser = 
        {
            "id": 28,
            "firstName": "Coco",
            "email": "cs1",
            "pswd": "cs1",
            "status": "CUSTOMER"
        }
    // next api would be loggedInUser 
    // retrieve logged in user in form of post request
    const cartAPI = ("http://localhost:8081/ordercontents");

    useEffect(function effectFunction() {
        axios.get(cartAPI)
            .then(response => response) 
            .then(({data: cart}) => {
                setCart(cart)
            });
    }, []);

    
    let cartItems = cart.map(function(el) {
        console.log(testUser.id === el.orderID)
        if (testUser.id === el.ordercontentsid) {
            return (
                <tr key={el.ordercontentsid}>
                <td>{el.item}</td>
                <td><input type="number" value={el.quantity}></input></td>
                <td>{el.price}</td>
                </tr>
            )   
        }
        // if (Object.values(testUser.id) != el.id) {
        //     return (<div>1231232131</div>)
        // }
    }) 
 
    return(
        <>
        <span id="cart">
        <h3>Shopping Cart</h3>
        <p>all of this should update according to our data via hooks</p>
        <table>
            <tr>
                <td><img src={choc} class="thumb"/></td>
                {cartItems}
            </tr>
            <tr>
                <td><img src={matcha} class="thumb"/></td>
                <td>Matcha Cake</td>
                <td><input type="number" value='1' id="qty2" class="qty" min="0" max="10" step="1"></input></td>
                <td>$3.50</td>
            </tr>
        </table>
        </span>
        <span id="sideBar">
            <h3>Your total:</h3>
            <div id="totals">
                <p>Subtotal: $17.50</p>
                <p>Tax: $1.93</p>
                <p><strong>Total: $19.43</strong></p>
            </div>
            <br/><br/><br/>
            <button id="pay" onClick={pay}>Checkout</button>
        </span>
        </>
    )
}

function pay(){
    alert("Pay me $1,000 please")
}
