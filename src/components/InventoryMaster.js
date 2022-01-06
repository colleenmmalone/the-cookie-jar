import React from "react";
import { useEffect, useState } from "react";
import axios from 'axios';
import InventoryById from "./InventoryById";
import InventoryList from "./InventoryList";
import AddInventoryItem from "./AddInventoryItem";
import ReactDOM from "react-dom";

export default function InventoryMaster() {

    const [id, setId] = useState('');
    const editItem = event => {
        event.preventDefault();
        this.props.history.push(`/inventory/$this.state.id/edit`);
    }


    return (
        <div>
            <input onChange={event => setId(event.target.value)} type="number" placeholder="enter itemID here" min="0"></input>
            <button onClick={inventorybyID}>View Inventory by Id</button>
            <br></br>
            <button onClick={viewAllInventory}>View Inventory</button>

            <button onClick={additem}>Add item to Inventory</button>
            <br/><br/>

            <div id="inventory">
                <InventoryList />
            </div>

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
}