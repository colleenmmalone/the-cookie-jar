import React from "react";
import { useEffect,useState} from "react";
import axios from 'axios';
import InventoryById from "./InventoryById";
import AddInventoryItem from "./AddInventoryItem";
import ReactDOM from "react-dom";
//import UpdateInventory from "./UpdateInventory";

export default function  InventoryList () {
    const url = 'http://localhost:8081/inventory'
  
    const [data, setData] = useState([])
  
    useEffect(() => {
      axios.get(url).then(response => setData(response.data))
    }, [])
    const renderTable = () => {
      return data.map(inventory => {
        return (
          <tr>
            <td>{inventory.itemid}</td>
            <td>{inventory.items}</td>
            <td>{inventory.quantity}</td> 
            <td>{inventory.price}</td> 
            <td>{inventory.storeImage}</td> 
          </tr>
        )
      })
    }
    const [id, setId] = useState('');
   const editItem = event => {
      event.preventDefault();
      this.props.history.push(`/inventory/$this.state.id/edit`);
    }
    return (
      <div>
        <input onChange={event => setId(event.target.value)} type="number" placeholder="enter itemID here"></input>
        <button onClick= {inventorybyID}>View Inventory by Id</button>
        <br></br>
        <button onClick= {editItem}>Update Inventory</button>
        <button onClick= {additem}>Add item to Inventory</button>
        <h1 id="title">Inventory Table</h1> 
        <table id="inventory"> 
          <thead>
            <tr>
              <th>ItemID</th>
              <th>Items</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>StoreImage</th>
            </tr>
          </thead>
          <tbody>{renderTable()}</tbody>
        </table>
      </div>
    )
  
  
  function additem(){
  ReactDOM.render(
    <React.StrictMode>
      <AddInventoryItem />
    </React.StrictMode>,
    document.getElementById('inventory')
  );
  }

  function inventorybyID(){
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