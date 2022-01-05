    //this will be replaced by Axios call data
    var myArr = [{"itemid":"1","items":"Matcha Cake","quantity":"5", "storeImg":"cake_matcha.jpg"},{"itemid":"2","items":"Chocolate Cake","quantity":"4", "storeImg":"cake_chocolate.jpg"},{"itemid":"3","items":"Cookie","quantity":"8", "storeImg":"default.jpg"},{"itemid":"4","items":"Strawberry Shortcake","quantity":"4", "storeImg":"default.jpg"}];



       console.log(myArr[0].storeImg);
       const Table = () => {
           return(
               <table>
                   {myArr.map(({items, quantity, storeImg}) => {
                       console.log(storeImg);
                       return (
                           <tr>
                               <td>
                                   <img src={require('./pictures/'+storeImg)} class="thumb"/>
                                   <h3> {items} $3</h3>
                                   <p>Quantity remaining:{quantity}</p>

                               </td>
                           </tr>

                       )
                   })}
               </table>
           )
       }

export default Table;