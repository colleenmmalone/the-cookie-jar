import React from React;
import { useEffect,useState} from "React";
import {useTable} from "react-table";
import axios from 'axios';

const getAllInventoryItems = () => {
    const url = 'http://localhost:8081/inventory/{id}'
  
    async function getAllInventoryItemsById(){
        try{
            const response = await axios.get('url',{
                params: {
                ID: id
                }
                  });
            }
          //  console.log(response);
             
        catch (error){
            console.error(error);
        }
    }
    
  
    const renderTable = () => {
      return data.map(inventory => {
        return (
          <tr>
            <td>{inventory.itemID}</td>
            <td>{inventory.items}</td>
            <td>{inventory.quantity}</td> 
            <td>{inventory.price}</td> 
            <td>{inventory.storeImage}</td> 
          </tr>
        )
      })
    }
  
    return (
      <div>
        <h1 id="title">Inventory Table</h1>
        <table id="inventory"> 
          <thead>
            <tr>
              <th>ItemID</th>
              <th>Items</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>StoreImage</th>
            </tr>
          </thead>
          <tbody>{renderTable()}</tbody>
        </table>
      </div>
    )
  }