import matcha from './pictures/cake_matcha.jpg';
import choc from './pictures/cake_chocolate.jpg';
import React, { useState, useEffect } from "react";
import axios from "axios";
import defaultImg from "./pictures/default.jpg";
import croissant from "./pictures/croissant.jpg";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/Cart.css'
export default function Cart(){

    // retrieve logged in user from backend
    const [loggedInUser, setLoggedInUser] = useState([]);

    // initial state of cart should be empty
    const [cart, setCart] = useState([]);

    // state for updating quantity and sending to backend
    const [newQuantity, setQuantity] = useState(0);

    const [total, setTotal] = useState([]);

    const [img, setImg] = useState([]);
  
    // test value === this should be the cart items that we get from the backend 
    let testUser = 
        {
            "orderid": 28,
            "customer": 1,
            "total": 0,
            "order_date": "test",
            "order_status": "Pending"
        }

    let loggedUser = {
        "email": "email",
        "first_name": "first_name",
        "last_name": "last_name",
        "pswd": "pwsd",
        "status": "status",
    }
    // next api would be loggedInUser 
    //to Andy from Colleen (can send a get logins by id request via Postman to log someone in)
    const whoIsLoggedInAPI = ("http://localhost:8081/logins/whoisloggedin");

    useEffect(function loginEffect() {
        axios.get(whoIsLoggedInAPI) 
            .then(response => response)
            .then(({data: loggedInUser}) => {
                setLoggedInUser(loggedInUser);
            })
    }, []);

    const cartAPI = ("http://localhost:8081/ordercontents");

    useEffect(function effectFunction() {
        axios.get(cartAPI)
            .then(response => response) 
            .then(({data: cart}) => {
                setCart(cart)
            });
    }, []);
    
   function deleteItem(cartId) {
        axios.delete(`http://localhost:8081/deleteordercontents/${cartId}`)
        .then(response => console.log(response))
        .catch(error => {
            console.log(error);
        }, []);
    }
    
    // cart
    let cartItems = cart.map(function(el) {
        let imgSrc;
        
        if (testUser.orderid === el.orderid) { 
            if (el.item === "Matcha Cake") {
                imgSrc = matcha;
            } else if (el.item === "Chocolate Cake") {
                imgSrc= choc;
            } else if (el.item === "Croissant") {
                imgSrc = croissant;
            } else {
                imgSrc = defaultImg;
            }
            
            return (
                <tr key={el.ordercontentsid}>
                <td >
                <img className='thumb' src={imgSrc} alt="cakeimage"/>
                </td>
                <td>{el.item}</td>
                <td><input onChange={(e) => {setQuantity(e.target.value)}} placeholder={`Current Quantity: ${el.quantity}`} className="cart-quantity-adjust" type="number" ></input>Quantity</td>
                <td>${el.price * el.quantity}</td>
                <Button onClick={()=> updateQuantity(el.ordercontentsid, newQuantity)}variant="info">Update</Button>
                <Button onClick={(e)=> deleteItem(el.ordercontentsid)}variant="danger">Remove</Button>
                </tr>
            )   
        }
    }) 
    // 86
    let cartTotal = total.map(function(el) {
        let totalCost = 0;
        
        return (
            <span id="sideBar">
            <h3>Your total:</h3>
            <div id="totals">
                <p>Tax: $1.93</p>
                <p><strong>Total: 0</strong></p>
            </div>
            <br/><br/><br/>
            <button id="pay" onClick={pay}>Checkout</button>
            </span>
        )
    })
    
    // double check
    const updateQuantity = (ordercontentsid, quantity) => {
        console.log(quantity);
        console.log(ordercontentsid);
        axios.put(`http://localhost:8081/ordercontents/updateordercontents/quantity=${quantity}/${ordercontentsid}`, {
            quantity: quantity, 
            ordercontentsid: ordercontentsid
        }).then((response) => {
            console.log(response);
        })
    }
    // onlick function
    return(
        <>
        <span id="cart">
        <h3>Shopping Cart</h3>
            <table class="table table-sm">
                <tbody>
                <tr>
                    {cartItems}
                </tr>
                </tbody>
            </table>
        </span>
         <span id="sideBar">
            <h3>Your total:</h3>
            <div id="totals">
                <p>Tax: $1.93</p>
                <p><strong>Total: 0</strong></p>
            </div>
            <br/><br/><br/>
            <button id="pay" onClick={pay}>Checkout</button>
            </span>
         {cartTotal}
        </>
    )
}

function pay(){
    alert("Pay me $1,000 please")
}
