import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import OrderContentsPage from "./OrderContentsPage";
import Button from 'react-bootstrap/Button';




export default function Orders() {
    const loginsAPI = ("http://localhost:8081/logins/");
    const ordersAPI = ("http://localhost:8081/orders/");

    const [sortType, setSortType] = useState("All");
    const [itemStatus, setItemStatus] = useState("");
    const [user, setUser] = useState([]);
    const [orders, setOrders] = useState([]);
    const [displayCartItems, setDisplayCartItems] = useState(false);
    const [currOrderId, setCurrOrderId] = useState(0);


    // grabs user data and set user
    useEffect(() => {
        axios.get(`${loginsAPI + "whoisloggedin"}`)
            .then(response => response)
            .then(({data: user}) => {
                setUser(user);
            })
            .catch(err => {
                console.log("Error setting user values", err)
            })
    }, []);

    useEffect(() => {
        axios.get(ordersAPI)
            .then(response => response)
            .then(({data: orders}) => {
                setOrders(orders);
            })
            .catch(err => {
                console.log("Error occurred while retrieve orders", err)
            })
    }, []);

    const displayAllOrders = orders.map((item) => {
        if (user.id === item.customer && user.status === "CUSTOMER") {
        return(
          <>  
          { sortType === item.orderStatus || sortType === "All" ?
            <tr key={item.orderid}>
              <td>{item.orderid}</td>
              <td>{"$"+item.total}</td>
              <td>{item.orderStatus}</td>
              <Button variant="info" onClick={() => {setDisplayCartItems(!displayCartItems); setCurrOrderId(item.orderid)}}>Order Contents</Button>
            </tr> : ""
        }
          </>  
          )
        }

        if (user.status === "EMPLOYEE") {
            return (
                <>
                    {sortType === item.orderStatus || sortType === "All" ?
                     <tr key={item.orderid}>
                     <td>{item.orderid}</td>
                     <td>{"$"+item.total}</td>
                     <td>{item.orderStatus}</td>
                     <td>
                        <select name="itemStatus" 
                        onChange={(e) => 
                        updateStatus(item.orderid, e.target.value) && setItemStatus(e.target.value) && updateOrderStatus(item.orderid, e.target.value)}>
                            <option value="" disabled selected>Update status...</option>
                            <option value="Pending">Pending</option>
                            <option value="Preparing">Preparing</option>
                            <option value="Delivered">Delivered</option>
                        </select>
                    </td>
                     </tr> : ""
                    }
                </>
            )
        } 
      }
    )

    // tells component to do something after selecting
    const updateStatus = function(id, status) {  
        updateOrderStatus(id, status)
        axios.put(`http://localhost:8081/orders/updateorder/status=${status}/${id}`)
            .then(response => console.log(response))
            .catch(err => {
                console.log("Error updating status", err);
            })
    }      
    const updateOrderStatus = (itemid, newStatus) => {
        setOrders(orders.map((val) => {
            return val.orderid === itemid ?
            {
                orderid: val.orderid,
                total: val.total,
                orderDate: val.orderDate,
                orderStatus: newStatus
            } : val
        }))
    }

    // wasn't able to pass props to nav bar button so I just used javascript way to redirect page when user clicks on orders navbar again
    let navBarOrderButton = document.getElementsByClassName("order-navBar");
    useEffect(() => {
        for (let i = 0; i < navBarOrderButton.length; i++) {
            navBarOrderButton[0].addEventListener('click', function(e) {
                e.preventDefault();
                setDisplayCartItems(false);
            })
        }
        })
        
            
    return (
        <>

            {displayCartItems ? <OrderContentsPage orders={orders} currOrderId={currOrderId} user={user} /> : 
            <>
            <h3 class="pageTitle">Orders</h3>
            <h5 id="thisUser"></h5>
            <span>Sort By:
                <select onChange={(e) => setSortType(e.target.value)}>
                <option value="All">All</option>
                <option value="Pending">Pending</option>
                <option value="Preparing">Preparing</option>
                <option value="Delivered">Delivered</option>
                </select>    
            </span>
            <table class="orderDisplay">
                <tr>
                    <th>Order#</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Order Contents</th>
                    {user.status === "EMPLOYEE" ? <th>Update Status</th>: ""}
                </tr>
                <tbody>
                  {displayAllOrders}
                </tbody>
            </table>
            </>
            }
        </>
    )

}









