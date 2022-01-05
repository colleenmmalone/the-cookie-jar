import React from "react";
import { useState } from "react";
import axios from 'axios';
import NavBar from "./navBar";

export default function UpdateInventory(id) {
    const [inventory,setInventory] = useState({
        item:"",
        quantity:"",
        price:"",
        storeImage:""
    });
axios.put("http://localhost:8081/inventory/updateinventory" + id["id"], inventory)
    .then(response => setInventory(response.inventory))
                                        
        
    .catch((error)=>{
        if (error.response.statut === 404){
            console.log('Oops! Inventory could not be updated!');
        }
        else{
            console.log(error.message);
        }
    })
    
 return (
    <>
    <input type="number" placeholder="id"/>
    <input type="number" onChange= {onChangeQuantity} placeholder="Enter new Quantity here"/>
    
     <input type="number" onChange= {onChangePrice} placeholder="Enter new price here" />
     <button onClick={NavBar} type="submit">Update</button>
    </>
 )

 function onChangeQuantity(e){
    setInventory({...inventory,[e.target.quantity]: e.target.value})
}

function onChangePrice(e){
    setInventory({...inventory,[e.target.price]: e.target.value})
}

    
    
}

 

