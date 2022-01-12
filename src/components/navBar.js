import ReactDOM from 'react-dom';
import React from 'react';

import "../App.css"

import Contact from "./Contact";
import Store from "./Store";
import Home from "./Home";
import Orders from './Orders';
import Cart from './Cart';




import Logout from './Logout';

import cartImg from './pictures/shopping-cart.png'

export default function NavBar() {
  return (
    <div className="App">
     <button onClick={home}>Home</button>&emsp;
     <button onClick={store}>Store</button>&emsp;
     <button onClick={contact}>Contact</button>&emsp;
     <button className="order-navBar" onClick={orders}>Orders</button>&emsp;
     <button onClick={logout}>Logout</button>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
     <span id="loggedInUser">Guest</span>&emsp;
   
     <img src={cartImg} id="cartImg" onClick={cart}/>

    </div>
  );
}

function home(){
  ReactDOM.render(
    <React.StrictMode>
      <Home/>
    </React.StrictMode>,
    document.getElementById('main')
  );
}

function store(){
  ReactDOM.render(
    <React.StrictMode>
      <Store />
    </React.StrictMode>,
    document.getElementById('main')
  );
}

function contact(){
  ReactDOM.render(
    <React.StrictMode>
      <Contact/>
    </React.StrictMode>,
    document.getElementById('main')
  );
}

function orders(){
  ReactDOM.render(
    <React.StrictMode>
      <Orders />
    </React.StrictMode>,
    document.getElementById('main')
  );
}

function logout(){
  ReactDOM.render(
    <React.StrictMode>
      <Logout />
    </React.StrictMode>,
    document.getElementById('main')
  );
}

function cart(){
  ReactDOM.render(
    <React.StrictMode>
      <Cart />
    </React.StrictMode>,
    document.getElementById('main')
  );
}

