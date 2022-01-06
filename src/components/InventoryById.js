
import React from "react";
import { useEffect, useState } from "react";
//import {useTable} from "react-table";
import axios from 'axios';
import ReactDOM from "react-dom";




const InventoryById = (id) => {

  const [data, setData] = useState({});


  const inventoryAPI = 'http://3.87.75.177:8081/inventory/'
  const newAPI = inventoryAPI + id.id;



  useEffect(() => {
    axios.get(inventoryAPI + id.id)
      .then((response => setData(response.data)))
  }, [])

  console.log("data");
  console.log(data);
  console.log(data.itemid + " dada");
  if (data.itemid == undefined) {
    return (
      <p>no data found for this item number</p>
    )
  } else {
    if (data.storeImg == undefined) {
      return (
        <div>
          <table id="inventory" class="orderDisplay">
            <thead>
              <tr>
                <th>ItemID</th>
                <th>Items</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>StoreImage</th>
              </tr>
            </thead>
            <tr>
              <td>{data.itemid}</td>
              <td>{data.items}</td>
              <td>{data.quantity}</td>
              <td>{data.price}</td>
              <td><img src={require('./pictures/default.jpg')} class="thumb" /></td>
            </tr>
          </table>
        </div>
      )
    } else {
      return (
        <div>
          <h1 class="pageTitle">View Inventory by ID</h1>
          <table id="inventory" class="orderDisplay">
            <thead>
              <tr>
                <th>ItemID</th>
                <th>Items</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>StoreImage</th>
              </tr>
            </thead>
            <tr>
              <td>{data.itemid}</td>
              <td>{data.items}</td>
              <td>{data.quantity}</td>
              <td>{data.price}</td>
              <td><img src={require('./pictures/' + data.storeImg)} class="thumb" /></td>
            </tr>
          </table>
        </div>
      )
    }
  }

}

export default InventoryById;

