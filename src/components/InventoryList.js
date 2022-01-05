import React from "react";
import { useEffect, useState } from "react";
import axios from 'axios';
import ReactDOM from "react-dom";
//import UpdateInventory from "./UpdateInventory";

export default function InventoryList() {
  const inventoryAPI = 'http://localhost:8081/inventory'

  axios.get(inventoryAPI)
    .then((response) => {
      displayInventory(response.data);

    })

  function displayInventory(data) {

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
          if (d.storeImg == undefined) {
            return (
              <tr>
                <td>{d.itemid}</td>
                <td>{d.items}</td>
                <td>{d.quantity}</td>
                <td>{d.price}</td>
                <td><img src={require('./pictures/default.jpg')} class="thumb" /></td>

              </tr>
            )
          } else {
            return (
              <tr>
                <td>{d.itemid}</td>
                <td>{d.items}</td>
                <td>{d.quantity}</td>
                <td>{d.price}</td>
                <td><img src={require('./pictures/' + d.storeImg)} class="thumb" /></td>

              </tr>
            )
          }
        })}
      </table>
    );

    ReactDOM.render(element, document.getElementById('datahere'));

  }

  return (
    <div id="datahere"></div>
  )

}