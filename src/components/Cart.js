import matcha from './pictures/cake_matcha.jpg';
import choc from './pictures/cake_chocolate.jpg';
import React, { useState, useEffect } from "react";
import axios from "axios";
import defaultImg from "./pictures/default.jpg";
import croissant from "./pictures/croissant.jpg";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/Cart.css'

export default function Cart(props){
    console.log(props.basket);

    let [basket, setBasket] = useState(props.basket);
    // retrieve logged in user from backend
    const [loggedInUser, setLoggedInUser] = useState([]);

    // initial state of cart should be empty
   // const [cart, setCart] = useState([props.basket]);

    let changeKeys = basket.map(item => {
    return {
      orderid: "",  
      itemid: item.itemid,
      item: item.items,
      price : item.price,
      quantity: item.quantity
    };
  });

    // state for updating quantity and sending to backend
    const [newQuantity, setQuantity] = useState(0);

    const whoIsLoggedInAPI = ("http://localhost:8081/logins/whoisloggedin");

    console.log(loggedInUser.id);

    useEffect(function loginEffect() {
        axios.get(whoIsLoggedInAPI) 
            .then(response => response)
            .then(({data: loggedInUser}) => {
                setLoggedInUser(loggedInUser);
            })
    }, []);

    let cartItems = changeKeys.map((el) => {
        console.log(el);
        let imgSrc;
        if (el.itemid === 9) {
            imgSrc = matcha;
        } else if (el.itemid === 8) {
            imgSrc= choc;
        } else if (el.itemid === 10) {
            imgSrc = croissant;
        } else {
            imgSrc = defaultImg;
        }  
            return (
                <tr key={el.itemid}>
                <td >
                <img className='thumb' src={imgSrc} alt="cakeimage"/>
                </td>
                <td>{el.item}</td>
                <td><input onChange={(e) => {setQuantity(e.target.value)}} placeholder={`Current Quantity: ${el.quantity}`} className="cart-quantity-adjust" type="number" ></input>Quantity</td>
                <td>${el.price * el.quantity}</td>
                {/* <Button onClick={()=> updateQuantity(el.itemid, newQuantity)}variant="info">Update</Button> */}
                {/* <Button onClick={(e)=> deleteOrderContents(el.itemid)}variant="danger">Remove</Button> */}
                </tr>
            )   
        }) 
        // testing this function still
        // let cartTotal = cart.reduce((total, currVal) => 
        //     total = total + (currVal.quantity *currVal.price), 0)
        
        //    const updateQuantity = setBasket(basket.map((val) => {
            //                     return val.ordercontentsid === ordercontentsid ? { ordercontentsid: val.ordercontentsid, orderid: val.orderid, item: val.item, price: val.price, quantity: newQuantity} : val
            //                 }))
            
            
            
            function pay(){
                alert("Pay me $1,000 please")
            }

            
       const payOrder = () => {
           axios.post(`http://localhost:8081/orders`, {
            customer: loggedInUser.id,
            total: 123,
            orderDate: "null",
            orderStatus: "PENDING",
            orderContents: changeKeys
           })

       } 
            
    //update order quantity
    // const updateQuantity = (ordercontentsid, quantity) => {
    //     axios.put(`http://localhost:8081/ordercontents/updateordercontents/quantity=${quantity}/${ordercontentsid}`, {
    //         quantity: quantity, 
    //         ordercontentsid: ordercontentsid
    //     }).then((response) => {
    //         setCart(cart.map((val) => {
    //             return val.ordercontentsid === ordercontentsid ? { ordercontentsid: val.ordercontentsid, orderid: val.orderid, item: val.item, price: val.price, quantity: newQuantity} : val
    //         }))
    //         console.log(response);
    //         alert("Quantity has been updated.");
    //     })
    // }

    // delete order content
    // const deleteOrderContents = (ordercontentsid) => {
    //     axios.delete(`http://localhost:8081/ordercontents/deleteordercontents/${ordercontentsid}`)
    //     .then((response) => {
    //         setCart(cart.filter((val) => {
    //             return val.ordercontentsid !== ordercontentsid
    //         }))
    //     })
    // }
    // onlick function conditionally render
    return(
        <>
        <span id="cart">
        <h3 class="pageTitle">Shopping Cart</h3>
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
                <p><strong>Total: </strong></p>
            </div>
            <br/><br/><br/>
            <button id="pay" onClick={payOrder}>Checkout</button>
            </span>
        </>
    )
}

