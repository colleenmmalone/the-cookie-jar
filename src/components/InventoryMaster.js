import React from "react";
import { useEffect, useState } from "react";
import axios from 'axios';
import InventoryById from "./InventoryById";
import InventoryList from "./InventoryList";
import AddInventoryItem from "./AddInventoryItem";
import ReactDOM from "react-dom";
//import UpdateInventory from "./UpdateInventory";
//            <button onClick={editItem}>Update Inventory</button>
export default function InventoryMaster() {

    const [id, setId] = useState('');
    const editItem = event => {
        event.preventDefault();
        this.props.history.push(`/inventory/$this.state.id/edit`);
    }
    return (
        <div>
            <input onChange={event => setId(event.target.value)} type="number" placeholder="enter itemID here"></input>
            <button onClick={inventorybyID}>View Inventory by Id</button>
            <br></br>
            <button onClick={viewAllInventory}>View Inventory</button>

            <button onClick={additem}>Add item to Inventory</button>
            <h1 class="pageTitle">Inventory</h1>

            <div id="inventory"></div>

        </div>
    )


    function additem() {
        ReactDOM.render(
            <React.StrictMode>
                <AddInventoryItem />
            </React.StrictMode>,
            document.getElementById('inventory')
        );
    }

    function viewAllInventory() {
        ReactDOM.render(
            <React.StrictMode>
                <InventoryList />
            </React.StrictMode>,
            document.getElementById('inventory')
        );
    }

    function inventorybyID() {
        ReactDOM.render(
            <React.StrictMode>
                <InventoryById id={id} />
            </React.StrictMode>,
            document.getElementById('inventory')
        );
    }


    // function updateInventory(){
    //   ReactDOM.render(
    //     <React.StrictMode>
    //       <UpdateInventory id={id} />
    //     </React.StrictMode>,
    //     document.getElementById('inventory')
    //   );
    // }


}