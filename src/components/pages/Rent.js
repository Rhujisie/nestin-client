import { useState,useEffect } from 'react'

import axios from '../../api/axios'
import Places from '../place/Places'

import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import useLocation from "../../hooks/useLocation"
import useAuth from '../../hooks/useAuth'

export default function Rent(){ 
  
  const {auth} = useAuth()

    const [places, setPlaces] = useState()
    const [wishlist, setWishlist] = useState()

    const axiosPrivate = useAxiosPrivate()
    const {location} = useLocation()

    //get place
    useEffect(()=>{
      const getPlace = async()=>{
        try{
          if(auth.accessToken){
            if(location.length){
              const {data} = await axiosPrivate.get(`/user/main/all/rent?search=${location}`)
              setPlaces(data)
            }else{
              const {data} = await axiosPrivate.get('/user/main/all/rent')
              setPlaces(data)
            }
          }else{
            if(location.length){
              const {data} = await axios.get(`/main/all/rent?search=${location}`)
              setPlaces(data)
            }else{
              const {data} = await axios.get('/main/all/rent')
              setPlaces(data)
            }
          }
        }catch(err){
          console.log(err)
        }
      }
      getPlace()
    }, [])

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
        auth.accessToken && getWishlist()
    },[places])
    
    let placeElem = []

    if(auth && wishlist?.length){
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