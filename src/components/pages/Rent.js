import { useState,useEffect } from 'react'
import axios from '../../api/axios'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import Places from '../place/Places'

export default function Rent(){
    const [places, setPlaces] = useState()
    const [wishlist, setWishlist] = useState()
    const [loggedIn, setLoggedIn] = useState(localStorage.getItem('loggedIn') 
    || false)
    const axiosPrivate = useAxiosPrivate()

    //get place
    useEffect(()=>{
        const getRent = async()=>{
            try{
                if(loggedIn){
                    const {data} = await axiosPrivate.get('/user/main/rent')
                    setPlaces(data)
                }else{
                    const {data} = await axios.get('/main/rent')
                    setPlaces(data)
                }
            }catch(err){
                console.log(err)
            }
        }
        getRent()
    },[])

      //get wishlist 
      useEffect(()=>{
        const getWishlist = async()=>{
            try{
              const {data} = await axiosPrivate.get('/wishlist/list')
              setWishlist(data.placeID)
            }catch(err){
              console.log(err)
            }
        }
        loggedIn && getWishlist()
    },[places])
    
    let placeElem = []

    if(loggedIn && wishlist){
      placeElem = places?.map((place, index)=>
      <Places key={index} place={place} heart={wishlist.includes(place._id)}/>)
    }else{
      placeElem = places?.map((place, index)=>
      <Places key={index} place={place}/>)
    }

    return(
        <div className="main">
            {places && placeElem}
        </div>
    )
}