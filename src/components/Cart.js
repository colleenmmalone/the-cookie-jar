import matcha from './pictures/cake_matcha.jpg';
import choc from './pictures/cake_chocolate.jpg';
import React, { useState, useEffect } from "react";
import axios from "axios";
import defaultImg from "./pictures/default.jpg";
import croissant from "./pictures/croissant.jpg";

export default function Cart(){

    // retrieve logged in user from backend
    const [loggedInUser, setLoggedInUser] = useState([]);

    // initial state of cart should be empty
    const [cart, setCart] = useState([]);

    // state for updating quantity and sending to backend
    const [quantity, setQuantity] = useState(0);

    const [total, setTotal] = useState([]);

    const [img, setImg] = useState([]);
  
    // test value === this should be the logged in user that we get from the backend 
    let testUser = 
        {
            "orderid": 28,
            "customer": 1,
            "total": 0,
            "order_date": "test",
            "order_status": "Pending"
        }
    // next api would be loggedInUser 
    // retrieve logged in user in form of post request
    const cartAPI = ("http://localhost:8081/ordercontents");

    useEffect(function effectFunction() {
        axios.get(cartAPI)
            .then(response => response) 
            .then(({data: cart,
            data: total}) => {
                setCart(cart)
                setTotal(total)
            });
    }, []);
    
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
                <img className='thumb' src={imgSrc}/>
                </td>
                <td>{el.item}</td>
                <td><input type="number" value={el.quantity}></input></td>
                <td>${el.price * el.quantity}</td>
                </tr>
            )   
        }
    }) 

    let cartTotal = total.map(function(el) {
      let totalCost = 0;
       
        return (
            <span id="sideBar">
            <h3>Your total:</h3>
            <div id="totals">
                <p>Tax: $1.93</p>
                <p><strong>Total: {totalCost}</strong></p>
            </div>
            <br/><br/><br/>
            <button id="pay" onClick={pay}>Checkout</button>
            </span>
        )
    })
    
    return(
        <>
        <span id="cart">
        <h3>Shopping Cart</h3>
            <table>
                <tbody>
                <tr>
                    {cartItems}
                </tr>
                </tbody>
            </table>
        </span>
         {cartTotal}
        </>
    )
}

function pay(){
    alert("Pay me $1,000 please")
}
