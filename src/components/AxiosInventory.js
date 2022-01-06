
//add this in the App.js file in the src folder of axios

// Get all inventory items 

async function getAllInventoryItems(){
    try{
        const response = await axios.get('http://localhost:8081/inventory');
        console.log(response);
    }
    catch (error){
        console.error(error);
    }
}

//To get inventorybyID

    async function getAllInventoryItemsById(){
        try{
            const response = await axios.get('http://localhost:8081/inventory/',{
                params: {
                ID: id
                }
                  });
            }
          //  console.log(response);
             
        catch (error){
            console.error(error);
        }
    }
    

//Add item(s) to inventory

const data = {item, quantity, price, storeImage};
axios.post('http://localhost:8081', data)
.then(function (response){
    console.log(response);
    if (response.success) {
        alert("Your item(s) was/were successfully saved")
    }
    else {
        alert("Error occured: Unable to add an item to inventory")
    }
})

.catch(function(error){
    console.log(error);
});

//Update inventory
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

//check Andy's code 
const updateQuantity = (ordercontentsid, quantity) => {
    axios.put(`http://localhost:8081/ordercontents/updateordercontents/quantity=${quantity}/${ordercontentsid}`, {
        quantity: quantity, 
        ordercontentsid: ordercontentsid
    }).then((response) => {
        setCart(cart.map((val) => {
            return val.ordercontentsid === ordercontentsid ? { ordercontentsid: val.ordercontentsid, orderid: val.orderid, item: val.item, price: val.price, quantity: newQuantity} : val
        }))
        console.log(response);
        alert("Quantity has been updated.");
    })
}

//my previous code for UPDATE iNVENTORY

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

