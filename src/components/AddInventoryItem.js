import React from "react";
import { useState } from "react";
import axios from 'axios'; 
import InventoryList from "./InventoryList";
import NavBar from "./navBar";

const AddInventoryItem = () => {
    const [item, setItem] = useState("");
    const [quantity, setQuantity] = useState("");
    const[price, setPrice] = useState("");
    const[storeImage, setImage] = useState("");

   // const postRequestHandler = () => {};
    const data = {item, quantity, price, storeImage};
    axios.post('http://localhost:8081/inventory', data)
    .then(function (response){
        console.log(response);
        if (response.success) {
            alert("Your item(s) was successfully saved")
        }
        else {
            alert("Error occured: Unable to add an item to inventory")
        }
    })
    
    .catch(function(error){
        console.log(error);
    });


    return (
        <>
         <input
            type="text"
            value={item}
            onChange={(e) => setItem(e.target.value)}
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
        <input
            type="image"
            value={storeImage}
            onChange={(e) => setImage(e.target.files)}
        />
          <button onClick={NavBar} type="submit">submit changes</button>      
     </>
    );
};

export default AddInventoryItem;
