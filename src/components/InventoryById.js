import React from "react";
import {useEffect, useState} from "react";
//import {useTable} from "react-table";
import axios from 'axios';



const InventoryById = (id) => {
  console.log(id["id"]);
    const url = 'http://localhost:8081/inventory/' + id["id"]
  
    const [data,setData] = useState([])
    
   useEffect(() => {
    axios.get(url).then(response => setData(response.data))
  }, [])

  console.log(data);
    const renderTable = () => {
    
     
       
        return (
          <tr>
            <td>{data.itemid}</td>
            <td>{data.items}</td>
            <td>{data.quantity}</td> 
            <td>{data.price}</td> 
            <td><img src={require('./pictures/'+data.storeImg)} class="thumb"/></td> 
          </tr>
        )

    }
    
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
          <tbody>{renderTable()}</tbody>
        </table>
      </div>
    )
  }

  export default InventoryById;