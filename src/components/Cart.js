import matcha from './pictures/cake_matcha.jpg';
import choc from './pictures/cake_chocolate.jpg';

export default function Cart(){
    return(
        <>
        <span id="cart">
        <h3>Shopping Cart</h3>
        <p>all of this should update according to our data via hooks</p>
        <table>
            <tr>
                <td><img src={choc} class="thumb"/></td>
                <td>Chocolate Cake</td>
                <td><input type="number" value="4" id="qty1" class="qty"></input></td>
                <td>$14.00</td>
            </tr>
            <tr>
                <td><img src={matcha} class="thumb"/></td>
                <td>Matcha Cake</td>
                <td><input type="number" value='1' id="qty2" class="qty" min="0" max="10" step="1"></input></td>
                <td>$3.50</td>
            </tr>
        </table>
        </span>
        <span id="sideBar">
            <h3>Your total:</h3>
            <div id="totals">
                <p>Subtotal: $17.50</p>
                <p>Tax: $1.93</p>
                <p><strong>Total: $19.43</strong></p>
            </div>
            <br/><br/><br/>
            <button id="pay" onClick={pay}>Checkout</button>
        </span>
        </>
    )
}

function pay(){
    alert("Pay me $1,000 please")
}
