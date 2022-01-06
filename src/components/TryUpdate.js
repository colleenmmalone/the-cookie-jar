// import axios from "axios";
// import { useState } from "react";
// import React from "react";
// import ReactDOM from "react-dom";

// import Store from "store";

// export default function UpdateData() {
//     const [inventory,setInventory] = useState({
        
//         quantity:"",
//         price:""
//     });
//     axios.put(`http://localhost:8081/inventory/updateinventory/${id}`, {
//         inventory
//     })
//     .then((response) => {
//         setInventory(inventory.map((val) => {
//             return val.id === id ? {itemid: val.itemid, items: val.items, price: {onChangePrice}, quantity: {onChangeQuantity}} : val
//         }))
//         console.log(response);
//         alert("Quantity has been updated.");
    
//     })

//     function onChangeQuantity(e){
//         setInventory({...inventory,[e.target.quantity]: e.target.value})
//     }
//     function onChangePrice(e){
//         setInventory({...inventory,[e.target.price]: e.target.value})
//     }
    
 
//  return (
//     <>
//       <input type="number" placeholder="id"/>
//     <input type="number" onChange= {onChangeQuantity} placeholder="Enter new Quantity here"/>
    
//      <input type="number" onChange= {onChangePrice} placeholder="Enter new price here" />
    
//      <button onClick={viewAllInventory} type="submit">Update</button> 
//     </>
//  )


// function viewAllInventory() {
//     ReactDOM.render(
//         <React.StrictMode>
//             <Store />
//         </React.StrictMode>,
//         document.getElementById('inventory')
//     );
// }
    
// }

