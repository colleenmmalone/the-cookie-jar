import React from "react";
import { useState } from "react";

import axios from 'axios'; 
import InventoryList from "./InventoryList";
import NavBar from "./navBar";
import ReactDOM from "react-dom";

const AddInventoryItem = () => {
    const [items, setItems] = useState("");
    const [quantity, setQuantity] = useState("");
    const[price, setPrice] = useState("");
    const[storeImage, setImage] = useState("");
    const store_img = 'default.jpg';

   // const postRequestHandler = () => {};
   function addNewItem(){
    const data = {items, quantity, price, store_img};
    axios.post('http://localhost:8081/inventory', {data})
    .then(function (response){
        console.log(response);
        if (response.success) {
            console.log("Your item(s) was successfully saved")
        }
        else {
            console.log("Error occured: Unable to add an item to inventory")
        }
    }) 
    .then(ReactDOM.render({InventoryList}, document.getElementById('inventory'))) 

    
    .catch(function(error){
        console.log(error);
    });

}



    return (
        <>
         <input
            type="text"

            value={items}
            onChange={(e) => setItems(e.target.value)}

            placeholder="Insert Item name here"
        />
        <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Insert quantity here"
        />
        <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Insert price here"
        />


          <button onClick={addNewItem} type="submit">submit changes</button>      

     </>
    );
};


export default AddInventoryItem;


