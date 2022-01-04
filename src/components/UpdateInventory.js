import React from "react";
import { useState } from "react";
import axios from 'axios';

export default function UpdateInventory() {
    const [inventory,setInventory] = useState({
        item:"",
        quantity:"",
        price:"",
        storeImage:""
    });


    function onChangeItem(e){
        setInventory({...inventory,[e.target.item]: e.target.value})
    }
    return(
        <>
            <input type="text" onChange={onChangeItem}/>
        </>
    );
    
    function onChangeQuantity(e){
        setInventory({...inventory,[e.target.quantity]: e.target.value})
    }
    //Not sure how many returns I need or how to implement that so that the employee can only update what they want
    return(
        <>
            <input type="number" onChange= {onChangeQuantity}/>
        </>
    )
    function onChangePrice(e){
        setPrice(e.target.value);
    }
    return(
        <>
            <input type="number" onChange= {onChangePrice}/>
        </>
    )

    function onChangeStoreImage(e){
        setInventory({...inventory,[e.target.storeImage]:e.target.files})
    }
    return(
        <>
            <input type="image" onChange= {onChangeStoreImage}/>
        </>
    )
    try{
        const res = await axios.put('/{id}', {
            quantity : quantity,
             item : item ,
             price: price,
             storeimage: storeImage
             
                                            });
        }
    catch(error){
        if (error.response.statut === 404){
            console.log('Oops! Inventory could not be updated!');
        }
        else{
            console.log(error.message)
        }
    }
    
    
    
}