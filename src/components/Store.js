import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import ReactPaginate from "react-paginate";

import InventoryMaster from "./InventoryMaster";
import Cart from './Cart.js';

import "../css/Store.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/Cart.css'

export default function Store(){
    const loginsAPI = ("http://localhost:8081/logins/");
    const inventoryUrl = ("http://localhost:8081/inventory/");
    
    const [item, setItems] = useState([]);
    const [basket, setBasket] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [cartPage, setCartPage] = useState(false);
    const [status, setStatus] = useState(""); 

    const itemsPerPage = 5;
    const pageVisited = pageNumber * itemsPerPage;
    const changePage = ({selected}) => {
        // set page num as selected
        setPageNumber(selected)
    }

    const pageCount = Math.ceil(item.length / itemsPerPage);
    const displayItems = item.slice(pageVisited, pageVisited + itemsPerPage).map(item => {
        return (
            <tr key={item.itemid}>
            <td className="store-table-data">
                <img className='thumb' src={require('./pictures/' + item.storeImg)} alt="cakeimage" />
            </td>
            <td className="store-table-data">{item.items}</td>
            <td className="store-table-data">${item.price}</td>
            {status === "CUSTOMER" ? <Button className="add-to-cart-button" onClick={()=> {addToCart(item)}} variant="info">Add To Cart</Button> : ""}
            </tr>
        )
    });

    useEffect(function inventoryFunc() {
        axios.get(inventoryUrl)
            .then(response => response)
            .then(({ data: item }) => {
                setItems(item)
            });
    }, []);

    // render inventory items
    useEffect(function effectFunction() {
        axios.get(loginsAPI + "whoisloggedin")
            .then(response => response)
            .then(({ data }) => { currentUser(data) })
            .catch(err => {
                console.log("Error occured", err);

            });
    }, []);

    const addToCart = (el) => {
        const exist = basket.find(x => x.itemid === el.itemid);
        // checks if item exist, if so increment quantity
        if (exist) {
            setBasket(basket.map((x) => x.itemid === el.itemid ? { ...exist, quantity: exist.quantity + 1 } : x
            )
            );
        } else {
            // else add item and set initial quantity to 1
            setBasket([...basket, { ...el, quantity: 1 }]);
        }
    }
    

//     let inventoryItem = item.map(function(el) {
//         let imgSrc;
//         // console.log(el);
// /*             if (el.items === "matcha cake") {
//                 imgSrc = matcha;
//             } else if (el.items === "chocolate cake") {
//                 imgSrc= choc;
//             } else if (el.items=== "croissant") {
//                 imgSrc = croissant;
//             } else {
//                 imgSrc = defaultImg;
//             } */
//             return (
//                 <tr key={el.itemid}>
//                 <td className="store-table-data">
//                     <img className='thumb' src={require('./pictures/' + el.storeImg)} alt="cakeimage" />
//                 </td>
//                 <td className="store-table-data">{el.items}</td>
//                 <td className="store-table-data">${el.price}</td>
//                 {status === "CUSTOMER" ? <Button className="add-to-cart-button" onClick={()=> {addToCart(el)}} variant="info">Add To Cart</Button> : ""}
//                 </tr>
//             )   

        
//     }) 

  function currentUser(data){
    console.log(data.firstName);
    setStatus(data.status);
    if(data.firstName === undefined){ //if no one is logged in
    }else{
        console.log(data.status);
        if(data.status === 'EMPLOYEE'){
            isEmployee();
        }
    }
}
    return(
        <>
            <h3 class="pageTitle">{!cartPage ? "Store" : ""}</h3>
            <h5 id="thisUser"></h5>
            {status === "CUSTOMER" ?<button className="btn btn-info" id="checkout" onClick={() => setCartPage(!cartPage)}>{cartPage ? ("Return to store") :("Checkout")}</button>: ""}
            <div id="empBtnDiv"></div>

            <span id="cart">
                <table class="table table-sm">
                    <tbody>
                        {cartPage ? <Cart basket={basket} />: (displayItems)}
                    </tbody>
                </table>
                        {cartPage ? "" : 
                        <ReactPaginate
                            previousLabel = {"Previous"}
                            nextLabel= {"Next"}
                            pageCount = {pageCount}
                            onPageChange = {changePage}
                            containerClassName={"paginationButtons"}
                            previousLinkClassName = {"previousButton"}
                            nextLinkClassName = {"nextButton"}
                            disabledClassName = {"paginationDisable"}
                            activeClassName = {"paginationActive"}
                        />
                        }
            </span>
        </>
    )
}

function updateStore() {
    ReactDOM.render(
        <React.StrictMode>
            <InventoryMaster />
        </React.StrictMode>,
        document.getElementById('main')
    );
}

function isEmployee() {
    ReactDOM.render(
        <button id="emp" id="update-inv" className="btn btn-info" onClick={updateStore}>Update Inventory</button>,
        document.getElementById('empBtnDiv')
    );
}