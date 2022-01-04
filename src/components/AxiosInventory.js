
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
axios.post('http://localhost:8081/newitem', data)
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


