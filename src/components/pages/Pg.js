import { useEffect, useState } from "react"

import Places from "../place/Places"
import Loader from "../Loader/Loader"
import axios from '../../api/axios'

import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import useLocation from "../../hooks/useLocation"
import useAuth from "../../hooks/useAuth"

export default function Pg(){

  const [places, setPlaces] = useState()
  const [wishlist, setWishlist] = useState()
  const [isLoading, setIsLoading] = useState(true)

  const axiosPrivate = useAxiosPrivate()
  const {location} = useLocation()
  const {auth} = useAuth()

  //get places
  useEffect(()=>{
    let isMounted = true
    const getPlace = async()=>{
      try{
        if(auth.accessToken){
          if(location.length){
            const {data} = await axiosPrivate.get(`/user/main/all/pg?search=${location}`)
            setPlaces(data)
          }else{
            const {data} = await axiosPrivate.get('/user/main/all/pg')
            setPlaces(data)
          }
        }else{
          if(location.length){
            const {data} = await axios.get(`/main/all/pg?search=${location}`)
            setPlaces(data)
          }else{
            const {data} = await axios.get('/main/all/pg')
            setPlaces(data)
          }
        }
      }catch(err){
        console.log(err)
      }
      finally{
        isMounted && setIsLoading(false)
      }
    }
    getPlace()
    return()=>{
      isMounted = false
    }
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
    auth && getWishlist()
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
            {isLoading? <Loader/>: placeElem}
        </div>
    )
}