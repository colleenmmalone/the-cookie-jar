import React from "react";
import { useState } from "react";
import InventoryById from "./InventoryById";
import InventoryList from "./InventoryList";
import ReactDOM from "react-dom";

import AddInventoryItem from "./AddInventoryItem";
import UpdateInventory from "./UpdateInventory";

export default function InventoryMaster() {

    const [id, setId] = useState('');
    // const editItem = event => {
    //     event.preventDefault();
    //     this.props.history.push(`/inventory/$this.state.id/edit`);
    // }


    return (
        <div>
            <input onChange={event => setId(event.target.value)} type="number" placeholder="enter itemID here" min="0"></input>
            <button className="btn btn-info" id="viewbyid" onClick={inventorybyID}>View by Id</button>
            <br/><br/>
            <button className="btn btn-info" id="viewall" onClick={viewAllInventory}>View All</button>    
            <button className="btn btn-info" id="add-inv" onClick={additem}>Add New Item</button>

            <br/><hr/>

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

    function quantity(){
      ReactDOM.render(
        <React.StrictMode>
          <UpdateInventory/>
        </React.StrictMode>,
        document.getElementById('inventory')
      );
    }


}