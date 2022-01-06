import React from "react";
import { useState } from "react";
import axios from 'axios';
import InventoryList from "./InventoryList";
import ReactDOM from "react-dom";

export default function AddInventoryItem ()  {
    const [items, setItems] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    //  const[storeImg, setstoreImg] = useState("");
    const storeImg = 'default.jpg';


    //function addNewItem(){
    const data = { items, quantity, price, storeImg };
    axios.post('http://localhost:8081/inventory', { data })
        .then(function (response) {
            console.log(response.data);
            if (response.success) {
                console.log("Your item(s) was successfully saved")
            }
            else {
                console.log("Error occured: Unable to add an item to inventory")
            }
        })
        .then(ReactDOM.render({ InventoryList }, document.getElementById('inventory')))

        .catch(function (error) {
            console.log(error);
        });


    return (
        <>
        <form>
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


          <button onClick={InventoryList} type="submit">submit changes</button>
          </form>
     </>
    );

}


