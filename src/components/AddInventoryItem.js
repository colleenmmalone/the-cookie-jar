import React from "react";
import { useState } from "react";
import axios from 'axios'; 
import InventoryList from "./InventoryList";
import ReactDOM from "react-dom";

const AddInventoryItem = () => {
    const [itemsin, setItems] = useState("");
    const [quantityin, setQuantity] = useState("");
    const[pricein, setPrice] = useState("");
    const[storeImage, setImage] = useState("");
    const storeImgin = 'default.jpg';

   // const postRequestHandler = () => {};
   function addNewItem(){
   // const data = {items, quantity, price, storeImg};
    console.log("inside addNewItem");
   // console.log(data);
    axios.post('http://localhost:8081/inventory', {
        items: itemsin,
        quantity: quantityin,
        price: pricein,
        storeImg: storeImgin
    },{timeout: 1000})
    .then(function (response){
        console.log(response);
        if (response.status == 200) {
            console.log("Your item(s) was successfully saved");
            document.getElementById("addItemRes").innerHTML = "You have added "+itemsin;
            {backToStore()};
        }
        else {
            alert("Error occured: Unable to add an item to inventory")
        }
    })    
    .catch(function(error){
        console.log(error);
    });
}


    return (
        <>
         <input
            type="text"
            value={itemsin}
            onChange={(e) => setItems(e.target.value)}
            placeholder="Insert Item name here"
        />
        <input
                type="number"
                value={quantityin}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Insert quantity here"
        />
        <input
                type="number"
                value={pricein}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Insert price here"
        />

          <button onClick={addNewItem} type="submit">submit changes</button>   <br/>

          <div id="addItemRes"></div>   
          <div id="refreshStore"></div> 
     </>
    );
};

export default AddInventoryItem;


function backToStore(){
const refreshBtn = (
        <button onClick={renderInv}>Refresh Store</button>
    )
    ReactDOM.render(refreshBtn, document.getElementById('refreshStore'));
}

function renderInv (){
    ReactDOM.render(<InventoryList />, document.getElementById('inventory'));
}
