import useAuth from "../../hooks/useAuth"
import { Link } from "react-router-dom"
import Add from '../../icon/addition.png'
import { useEffect, useState } from "react"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import Places from '../place/Places'

export default function NestYourHome(){

    const [places, setPlaces] = useState()
    const [wishlist, setWishlist] = useState()
    const {auth} = useAuth()
    const axiosPrivate = useAxiosPrivate()
    //get places
    useEffect(()=>{
        const getPlace = async()=>{
          try{
            const {data} = await axiosPrivate.get('/place')
            console.log(data)
            setPlaces(data)
          }catch(err){
            console.log(err)
          }
        }
        getPlace()
    },[])
    //get wishlist 
    useEffect(()=>{
        const getWishlist = async()=>{
            const {data} = await axiosPrivate.get('/wishlist/list')
            setWishlist(data)
        }
        //getWishlist()
    },[])
    const placesElem = places?.map((place, i)=> <Places place={place} 
        key={i} heart={wishlist?.includes(place._id)}/>)

    return(
        <div className="nest-your-home">
            <h2 className="page-heading">Hello, {auth?.name}</h2>
            <div className="add-accomodation">
                <div className="add-logo">
                    <img src={Add} alt='add'/>
                </div>
                <div>
                    <Link to='/nestyourhome/addaccomodation' 
                    style={{textDecoration: 'none', color: 'white',
                    fontWeight: '600', fontSize: '14px'}}>
                        Add Accomodation
                    </Link>
                </div>
            </div>
            {places?.length? <><h2 className="page-sub-heading">My Listing:</h2>
                    <div className="main main-nest">
                        {placesElem}
                    </div>
                    </>
                : <><h2 className="page-sub-heading">No Listing</h2>
                    <p style={{marginLeft: '10px'}} className="para">
                        Share your slice of paradise with the world!<br/> List your place by clicking on Add accomodation
                    </p>
                </>}
            {/* <div className="listing">
                {wishlist && placesElem}
            </div> */}

        </div>
    )
}