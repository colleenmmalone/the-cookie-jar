import matcha from './pictures/cake_matcha.jpg';
import choc from './pictures/cake_chocolate.jpg';
import React, { useState, useEffect } from "react";
import axios from "axios";
import defaultImg from "./pictures/default.jpg";
import croissant from "./pictures/croissant.jpg";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/Cart.css'
import AfterCheckout from './AfterCheckout';

export default function Cart(props){

    let [basket, setBasket] = useState(props.basket);
    const [successPage, setSuccessPage] = useState(true);
    // retrieve logged in user from backend
    const [loggedInUser, setLoggedInUser] = useState([]);
    var date = new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString()

    

    // function to change basket items to match order item keys
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
                <td><input onChange={(e) => {setQuantity(e.target.value)}} 
                    placeholder={`Current Quantity: ${el.quantity}`}
                    className="cart-quantity-adjust" type="number" >
                </input>Quantity</td>
                <td>${el.price * el.quantity}</td>
                 <Button onClick={()=> updateQuantity(el.itemid,newQuantity)}variant="info">Update</Button>
                 <Button onClick={()=> deleteItem(el.itemid)}variant="danger">Remove</Button>
                </tr>
            )   
        }) 

    let totalPrice = changeKeys.map(x => x.price * x.quantity).reduce((a,b) => a+b);
            
       const payOrder = () => {
           axios.post(`http://localhost:8081/orders`, {
            customer: loggedInUser.id,
            total: `${totalPrice}`,
            orderDate: `${date}`,
            orderStatus: "PENDING",
            orderContents: changeKeys
           })
       } 

       const updateQuantity = (itemid, newQuantity) => {
           setBasket(basket.map((val) => {
                return val.itemid === itemid ? 
                {itemid: val.itemid,
                 orderid: val.orderid,
                 item: val.items,
                 price: val.price,
                 quantity: newQuantity
                } : val
           }))
       }
            
    const deleteItem = (itemId) => {
        setBasket(basket.filter((val) => {
            return val.itemid !== itemId    
        }))
    }

    const handleSuccessBtn = e => {
        setSuccessPage(!successPage);
    };
    return(
        <>
        { successPage ? 
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
                <p><strong>Total: ${totalPrice}</strong></p>
            </div>
            <br/><br/><br/>
            <button id="pay" onClick={() => {payOrder(); handleSuccessBtn()}}>Checkout</button>
            </span>
        </> : <AfterCheckout />
        }
        </>
    )
}

