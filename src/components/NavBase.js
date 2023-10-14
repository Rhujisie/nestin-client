import { useState } from "react"
import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"

import Upload from '../images/upload.png'
import Heart from '../images/heart.png'
import User from '../images/user.png'


export default function NavBase(){
     const [showBaseNav, setShowBaseNav] = useState(true)
     const [currentPixel, setCurrentPixel] = useState(window.scrollY)
     const {auth} = useAuth()
     
     const displayBaseNav=()=>{
        if(window.scrollY >= currentPixel){
            setShowBaseNav(false)
        }else{
            setShowBaseNav(true)
        }
        setCurrentPixel(window.scrollY)
     }
     window.addEventListener('scroll', displayBaseNav)
    return(
        <div className={showBaseNav? 'nav-base': 'nav-base active-base'}>
            <Link to={`nestyourhome`} style={{textDecoration: 'none'}}>
                <div className="airbnb-home nav-base-child">
                    <img src={Upload} alt="upload"/>
                     Nest your home
                </div>
            </Link>
            <Link to={'wishlist'} style={{textDecoration: 'none'}}>
                <div className="wishlist-logo nav-base-child">                   
                    <img src={Heart} alt="heart"/>
                    Wishlist
                </div>
            </Link>   
            <Link to={'profile'} style={{textDecoration: 'none'}}>
                <div className="profile-logo nav-base-child">
                    <img src={User} alt="user"/>
                    {auth?.name? auth.name: 'Login'}
                </div>
            </Link>
        </div>
    )
}