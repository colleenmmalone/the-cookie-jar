import React, { useState } from "react";
import GenerateTable from "./GenerateTable";
import UploadAndDisplayImage from "./UploadAndDisplay";


export default function Store(){
    const pics = importPics(require.context('./pictures', false, /\.(png|jpe?g|svg)$/));
    /*{generateTable(pics)}
  <UploadAndDisplayImage/>*/

  

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
        <div id='storeDisplay'>
            <GenerateTable />

        </div>
        


        
        </>
    )
}

function importPics(r){
        let pics = {};
         r.keys().forEach((item, index) => { pics[item.replace('./', '')] = r(item); });
        return pics
       }


