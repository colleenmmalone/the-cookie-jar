import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactDOM from "react-dom";



export default function Orders() {
    const loginsAPI = ("http://localhost:8081/logins/");
    const ordersAPI = ("http://localhost:8081/orders/");

    axios.get(loginsAPI+"whoisloggedin")
        .then(function (response){
          getOrders(response.data);
            })       


        function getOrders(user){
            if(user.firstName === undefined){
                document.getElementById("thisUser").innerHTML = "No one is logged in"
            }
            document.getElementById("thisUser").innerHTML = user.firstName+" "+user.lastName+" is logged in"; 
              axios.get(ordersAPI)  
              .then(function (response){
                  displayOrders(user, response.data);
              })
            }
            
function displayOrders(user, orders){
    console.log(user);
    console.log(orders);

       const element = (
            <table class="orderDisplay">
                <tr>
                    <th>Order#</th>
                    <th>Total</th>
                    <th>Status</th>
                </tr>
               { orders.map(o => {
                   if(user.id === o.customer){
                    return(
                        <tr>
                        <td>{o.orderid}</td>
                        <td>{"$"+o.total}</td>
                        <td>{o.orderStatus}</td>
                        </tr>
                    )
               }
                })}
           </table>
           );
    ReactDOM.render(element, document.getElementById('orderDisplay'));

}


    return (
        <>

            <h3 class="pageTitle">Orders</h3>
            <h5 id="thisUser"></h5>
            <div id="orderDisplay"></div>


        </>
    )

}








