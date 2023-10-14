import { Link } from "react-router-dom";


export default function Footer(){
    return(
        <footer>
            <div className="footer-container"> 
                <div className="connect-with-us">
                    <h2 className="footer-heading">Connect with us.</h2>
                    <div><a href="https://www.facebook.com/profile.php?id=100008613611221" target="blank">Facebook.</a></div>
                    <div><a href="https://www.instagram.com/rhujisie_kajiri/?hl=en" target="blank">Instagram.</a></div>
                    <div><a href="https://twitter.com/sucker_57" target="blank">Twitter.</a></div>   
                </div>
                <div className="get-to-know-us">
                    <h2 className="footer-heading">Get to know us.</h2>
                    <div><Link>About us.</Link></div>
                    <div><Link>Careers.</Link></div>   
                </div>
                <div className="let-us-help-you">
                    <h2 className="footer-heading">Let us help you.</h2>
                    <div><Link>Your account.</Link></div>
                    <div><Link>Customer support.</Link></div>
                    <div><Link>Bookings/Listing.</Link></div> 
                </div>
                <div className="Work-with-us">
                    <h2 className="footer-heading">Work with us.</h2>
                    <div><Link>Become a nester.</Link></div>
                </div>
            </div>
            <hr style={{marginTop: '10px'}}/>
            <div className="inc">© 2023 NestIn, Inc.</div>
        </footer>
    )
}