import React from "react";
import { useState } from "react";
import axios from 'axios';

import InventoryList from './InventoryList';
import ReactDOM from "react-dom";
import { isConstructorDeclaration } from "typescript";

export default function UpdateInventory(props) {


    const [id, setId] = useState(0);
    console.log("id=" +id);
    const [quantityin, setQuantity] = useState(0);
    console.log("qty="+ quantityin);
    const [pricein, setPrice] = useState(0);
    console.log("price =" + pricein);


    
 
 return (
    <>
        <input className="updateInv" type="number" onChange={e => setId(e.target.value)} placeholder="id"/>
        <input className="updateInv" type="number" onChange= {e => setQuantity(e.target.value)} placeholder="Enter new Quantity here"/>
        <input className="updateInv" type="number" onChange= {e => setPrice(e.target.value)} placeholder="Enter new price here" />

    
     <button onClick={updateCall} className="btn btn-info" id="update-inv" type="submit">Update</button> <br/>
     <div id="infoBar"></div>
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

    axios.put(`http://localhost:8081/inventory/updateinventory/${id}`, {
        price: pricein, 
        quantity: quantityin
    })

                             
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



 
