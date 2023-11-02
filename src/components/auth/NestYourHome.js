import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import {motion} from 'framer-motion'

import useAuth from "../../hooks/useAuth"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"

import Places from '../place/Places'

import Add from '../../icon/add.png'

export default function NestYourHome(){

    const [places, setPlaces] = useState()
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
    
    const placesElem = places?.map((place, i)=> <Places place={place} 
        key={i}/>)

    return(
        <div className="profile">
            <h2 className="page-heading">Hello, {auth?.name}:</h2>
            <motion.div className="add-accomodation" 
            whileHover={{scale: 1.05}} whileTap={{scale: .95}}>
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
            </motion.div>
            {places?.length? <><h2 className="page-sub-heading" style={{fontWeight: '700'}}>My Listing:</h2>
                    <div className="main main-nest">
                        {placesElem}
                    </div>
                    </>
                : <><h2 className="page-sub-heading">No Listing</h2>
                    <p style={{marginLeft: '10px'}} className="para">
                        Share your slice of paradise with the world!<br/> List your place by clicking on Add accomodation
                    </p>
            </>}
        </div>
    )
}