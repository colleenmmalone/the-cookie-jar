
export default function GenerateTable(){
    const pics = importPics(require.context('./pictures', false, /\.(png|jpe?g|svg)$/));
    var myArr = [{"itemid":"1","items":"Matcha Cake","quantity":"5"},{"itemid":"2","items":"Chocolate Cake","quantity":"4"},{"itemid":"3","items":"Cookie","quantity":"8"},{"itemid":"4","items":"Strawberry Shortcake","quantity":"4"}];

    var table = document.getElementById("mememe");

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
    return(
        <>
            <h1>hello</h1>;
            <table id="mememe">
            </table>

        </>
        );

}


function importPics(r){
    let pics = {};
     r.keys().forEach((item, index) => { pics[item.replace('./', '')] = r(item); });
    return pics
   }