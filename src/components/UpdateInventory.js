import React from "react";
import { useState } from "react";
import axios from 'axios';

import InventoryList from './InventoryList';
import ReactDOM from "react-dom";

export default function UpdateInventory() {


    const [id, setId] = useState(0);
    console.log("id=" +id);
    const [quantityin, setQuantity] = useState(0);
    console.log("qty="+ quantityin);
    const [pricein, setPrice] = useState(0);
    console.log("price =" + pricein);

    
 
 return (
    <>

      <input type="number" onChange={e => setId(e.target.value)} placeholder="id"/>
    <input type="number" onChange= {e => setQuantity(e.target.value)} placeholder="Enter new Quantity here"/>
    
     <input type="number" onChange= {e => setPrice(e.target.value)} placeholder="Enter new price here" />

    
     <button onClick={updateCall} type="submit">Update</button> 
    </>
 )


function viewAllInventory() {
    ReactDOM.render(
        <React.StrictMode>
            <InventoryList />
        </React.StrictMode>,
        document.getElementById('inventory')
    );
}
function updateCall()  {

    axios.put(`http://3.87.75.177:8081/inventory/updateinventory/${id}`, {price: pricein, quantity: quantityin})

                             
.catch((error)=>{
    if (error.response.status === 404){
        console.log('Oops! Inventory could not be updated!');
    }
    else{
        console.log(error.message);
    }
    
})
};

}



 
