import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import { useEffect, useState } from "react"
import Place from  '../place/Places'
import useAuth from "../../hooks/useAuth"
import { Link } from "react-router-dom"

import Heart from '../../icon/heart-red.gif'

export default function WishList(){

    const [wishlist, setWishlist] = useState()
    const axiosPrivate = useAxiosPrivate()
    const {auth} = useAuth()

    useEffect(()=>{
        const getWishlist = async()=>{
            try{
                const {data} = await axiosPrivate.get('/wishlist')
            setWishlist(data)
            }catch(err){
                console.log(err)
            }
        }
        getWishlist()
    },[])
    const wishlistElem  = wishlist?.map((place, i)=><Place key={i} place={place} heart={true}/>)
    return(
        <div className="profile">
            <h2 className="page-heading" style={{marginBottom: '20px'}}>
                {auth?.name}'s wishlist:</h2>
                <div className="main">
                    {wishlistElem}
                </div>
            {!wishlist?.length && <>
                <h2 className="page-sub-heading" style={{marginLeft: '10px',color: '#d47d31'}}>Empty!</h2>
                <p className="para"  style={{marginLeft: '10px'}}>You can add a place to your wishlist<br/>by clicking the 
                    <span> <img src={Heart} alt='heart' className="heart-icon-empty"/></span>
                </p>
                <Link to='/'>
                    <button className="page-button">Start exploring</button>
                </Link>
            </>}
        </div>
    )
}