    //this uploads pics from saved folder
    const pics = importPics(require.context('./pictures', false, /\.(png|jpe?g|svg)$/));

    //this will be replaced by Axios call data
    var myArr = [{"itemid":"1","items":"Matcha Cake","quantity":"5", "storeImg":"cake_matcha.jpg"},{"itemid":"2","items":"Chocolate Cake","quantity":"4", "storeImg":"cake_chocolate.jpg"},{"itemid":"3","items":"Cookie","quantity":"8", "storeImg":"cake_matcha.jpg"},{"itemid":"4","items":"Strawberry Shortcake","quantity":"4", "storeImg":"shopping-cart.png"}];

    function importPics(r){
        let pics = {};
         r.keys().forEach((item, index) => { pics[item.replace('./', '')] = r(item); });
        return pics
       }

       console.log(myArr[0].storeImg);
       const Table = () => {
           return(
               <table>
                   {myArr.map(({items, quantity, storeImg}) => {
                       console.log(storeImg);
                       return (
                           <tr>
                               <td>
                                   {/*a.setAttribute("src", pics[`cake_matcha.jpg`]);*/}
                                   <img src={require('./pictures/'+storeImg)} class="thumb"/>
                                   <p>{items}</p>
                                   <p>{quantity}</p>

                               </td>
                           </tr>
                       )
                   })}
               </table>
           )
       }
/* function forLoop(){
    var table = document.createElement("table");
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
} */






export default Table;