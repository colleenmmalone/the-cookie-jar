import React from "react";
import { useEffect, useState } from "react";
import axios from 'axios';
import ReactDOM from "react-dom";
//import UpdateInventory from "./UpdateInventory";

export default function InventoryList() {
  const url = 'http://localhost:8081/inventory'



  axios.get(url)
    .then(function (response) {
      displayInventory(response.data);
    })





  /*     const renderTable = () => {
        return data.map(inventory => {
          return (
            <tr>
              <td>{inventory.itemid}</td>
              <td>{inventory.items}</td>
              <td>{inventory.quantity}</td> 
              <td>{inventory.price}</td> 
              <td><img src={require('./pictures/'+inventory.storeImg)} class="thumb"/></td>                      
            </tr>
          )
        })
      }
  
      ReactDOM.render(renderTable, document.getElementById("datahere"));
   */


  function displayInventory(data) {

    console.log(data);
    const element = (
      <table class="orderDisplay">
        <thead>
          <tr>

            <th>ItemID</th>
            <th>Items</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>StoreImage</th>

          </tr>
        </thead>
        {data.map(d => {
          <tbody>
            return(
            <tr>
              <td>{d.itemid}</td>
              <td>{d.items}</td>
              <td>{d.quantity}</td>
              <td>{d.price}</td>
              <td><img src={require('./pictures/' + d.storeImg)} class="thumb" /></td>
            </tr>
            )
          </tbody>
        })}
      </table>
    );

    console.log(element);

  //  ReactDOM.render(element, document.getElementById('datahere'));

  }

  return (
    <div id="datahere">
<p>hello</p>

    </div>
  )

}