
import logo from './logo.svg';

export default function Contact(){
    return(
        <>
        <h3 class="pageTitle">Store hours</h3>
        <p>Monday: closed</p>
        <p>Tues-Thurs: 10am-6pm</p>
        <p>Fri-Sun: 10am-6pm</p>
        <hr/>
        <h3>Address</h3>
        <p>123 Fake St.</p>
        <p>Townsburg VA, 12345</p>
        <hr/>
        <h3>Phone Number</h3>
        <p>(123) 123-1234</p>
        <hr/>
        <h3>Email</h3>
        <p>admin@thecookiejar.com</p>

        <img src={logo} className="settingsLogo" alt="logo"/>
        
        </>
    )
}