import { useEffect, useState } from "react"

import Places from "../place/Places"
import Loader from "../Loader/Loader"
import axios from '../../api/axios'

import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import useLocation from "../../hooks/useLocation"
import useAuth from "../../hooks/useAuth"

export default function Index(){
    const [places, setPlaces] = useState()
    const [wishlist, setWishlist] = useState()
    const [isLoading, setIsLoading] = useState(true)

    const axiosPrivate = useAxiosPrivate()
    const {location} = useLocation()
    const {auth} = useAuth()
    console.log(auth, location)

    //get place
    useEffect(()=>{
      let isMounted = true
      const getPlace = async()=>{
        try{
          if(auth.accessToken){
            if(location.length){
              const {data} = await axiosPrivate.get(`/user/main/all/all?search=${location}`)
              setPlaces(data)
            }else{
              const {data} = await axiosPrivate.get('/user/main/all/all')
              setPlaces(data)
            }
          }else{
            if(location.length){
              const {data} = await axios.get(`/main/all/all?search=${location}`)
              setPlaces(data)
            }else{
              const {data} = await axios.get('/main/all/all')
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
      return ()=>{
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
    console.log(isLoading)
    return(
        <div className="main">
            {isLoading? <Loader/>: placeElem}
        </div>
    )
}