import React, { useState } from "react";
import UploadAndDisplayImage from "./UploadAndDisplay";


export default function Store(){
    const pics = importPics(require.context('./pictures', false, /\.(png|jpe?g|svg)$/));

    return(
        <>
        <h3>Store</h3>
        <img src={pics[`cake_matcha.jpg`]} class="thumb" />
        <p>when an EMPLOYEE logs in, there should be an additional button that allows them to update invetory</p>
        <p>hello this is the Store! Please buy lots of cookies</p>

        this is where the inventory should be called and parsed into tables<br/>
        should have image, name, price, add-to-cart button
        <p>the following upload function works, but we need to find a place to store our files</p>
        <p>maybe a bucket on AWS?</p>
        
        <UploadAndDisplayImage/>
        {generateTable(pics)};

        </>
    )
}

function importPics(r){
        let pics = {};
         r.keys().forEach((item, index) => { pics[item.replace('./', '')] = r(item); });
        return pics
       }
    

function generateTable(pics){
    var dataSection = document.getElementById("main");
    var myArr = [{"itemid":"1","items":"Matcha Cake","quantity":"5"},{"itemid":"2","items":"Chocolate Cake","quantity":"4"},{"itemid":"3","items":"Cookie","quantity":"8"},{"itemid":"4","items":"Strawberry Shortcake","quantity":"4"}];

    var table = document.createElement('table');

    for(var i=0 ; i < 4 ; i++){
        console.log(myArr[i]);
        var tr = document.createElement('tr');  
        var td = document.createElement("td");

            var a = document.createElement("img");
                a.setAttribute("src", pics[`cake_matcha.jpg`]);
                a.setAttribute("class", "thumb");
            var b = document.createElement("p");
              b.innerHTML = myArr[i].items;
            var c = document.createElement("button");
                c.setAttribute("id", myArr.itemid);
                c.textContent = myArr[i].itemid;

        td.appendChild(a);  
        td.appendChild(b);       
        td.appendChild(c);  
        tr.appendChild(td);
        tr.appendChild(td);

        table.appendChild(tr);
    }
    dataSection.appendChild(table);

}