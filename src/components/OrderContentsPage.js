import matcha from './pictures/cake_matcha.jpg';
import choc from './pictures/cake_chocolate.jpg';
import React, { useState, useEffect } from "react";
import axios from "axios";
import defaultImg from "./pictures/default.jpg";
import croissant from "./pictures/croissant.jpg";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/Cart.css'

// curr props
// --> props.orders
// --> props.currOrderId
// --> props.user
export default function OrderContentsPage(props) {

    const [orderContents, setOrderContents] = useState([]);

    // const displayOrderContents = props.orders.map((item) => {
    //    if (props.user.id === item.customer && props.currOrderId === item.orderid) 
    //         for (let i = 0; i < item.orderContents.length; i++) {
    //                <>
                    // <tr key={item.orderContents[i].ordercontentsid}>
                    //     <td>{item.orderContents[i].ordercontentsid}</td>
                    //     <td>{item.orderContents[i].item}</td>
                    //     <td>{item.orderContents[i].price}</td>
                    //     <td>{item.orderContents[i].quantity}</td>
    //                 </tr>
    //                </>
    //         }
    // })

    const displayOrderContents = props.orders.map((item) => {
        return item.orderContents.map((orderContents) => {
            if (props.user.id === item.customer && props.currOrderId === item.orderid) {
                return (
                    <>
                       <tr key={orderContents.id}>
                        <td>{orderContents.ordercontentsid}</td>
                        <td>{orderContents.item}</td>
                        <td>{orderContents.price}</td>
                        <td>{orderContents.quantity}</td>
                       </tr>
                    </>
                )
            }

            if (props.currOrderId === item.orderid) {
                return (
                    <>
                    <tr key={orderContents.id}>
                     <td>{orderContents.ordercontentsid}</td>
                     <td>{orderContents.item}</td>
                     <td>{orderContents.price}</td>
                     <td>{orderContents.quantity}</td>
                    </tr>
                 </>
                )
            }
        })
    })

    return (
        <>
          <h3 class="pageTitle">Order Contents</h3>
          <table class="orderDisplay">
              <tr>
                  <th>Order Contents #</th>
                  <th>Item</th>
                  <th>Price</th>
                  <th>Quantity</th>
              </tr>
              <tbody>
                  {displayOrderContents}
              </tbody>    
          </table>
    
        </>

    )
    
    
}