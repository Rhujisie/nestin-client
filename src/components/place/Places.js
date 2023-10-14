import { Link, useLocation, useNavigate} from 'react-router-dom'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'

import Rupee from '../../icon/rupee.png'
import { useState } from 'react'
import Rating from '../review/Rating'
import Photos from './Photos'

import HeartRed from '../../icon/heart-red.gif'
import Heart from '../../icon/heart.gif'

export default function Places({place, heart}){

    const [wishlist, setWishlist] = useState(heart)
    //const [points, setPoints] = useState(place.points)
    const axiosPrivate = useAxiosPrivate()
    const [loggedIn, setLoggedIn] = useState(localStorage.getItem('loggedIn')
     || false)
    const location = useLocation()
    const navigate = useNavigate()

    // toggle wishlist
    const handleHeart= async(e)=>{
        e.preventDefault()   
        try{
            //change loggedIn - auth
            if(loggedIn){
                await axiosPrivate.patch(`/wishlist/update/${place._id}`)
                //add points on wishlist add
                // !heart && await axios.patch(`/place/point/${place._id}`
                // , {points: points + 2})
    
                setWishlist(prev => !prev)
            }else{
                navigate('/login', { state: { from: location }, replace: true })
            }
        }catch(err){
            console.log(err)
        }
    }

    //add points on place visit
    //const handleClick = async()=>{
        // !heart && await axios.patch(`/place/point/${place._id}`
        // , {points: points + 2})
        //console.log('handle Click')
    // }
    const amenitiesElem = []

    for(let i = 0; i < 6; i++){
        amenitiesElem.push(
            <div key={i}>
                {place.amenities[i]}
            </div>)
    }
    return(
            <div className="places">
                <Link to={location.pathname === '/nestyourhome'?
                `/myplace/${place._id}`: `/place/${place._id}`}>
                <div className='photos-container'>
                    <Photos photos={place.photos}/>
                </div>
                <div className="place-description">
                    <h1 style={{color: '#43ad1f'}}>{place.address}, {place.city} <span style={{color: 'white', fontSize: '12px'}}>
                        - {place.type}
                    </span></h1>
                    <div className='bhk-contianer'>
                        {place.bedroom > 0 && <h1>
                            <span className='grey-place'>{place.bedroom} -Bedroom</span>, 
                        </h1>}
                        {place.livingroom > 0 &&<h1>
                            <span className='grey-place'>{place.livingroom} -Livingroom</span>, 
                        </h1>}
                        {place.kitchen > 0 && <h1>
                            <span className='grey-place'>{place.kitchen} -Kitchen</span>, 
                        </h1>}
                        {place.washroom > 0 && <h1>
                            <span className='grey-place'>{place.washroom} -Washroom</span>  
                        </h1>}
                    </div>
                    {/* <img src={Washroom}  className='places-icon' alt='washroom'/> */}
                    
                    <h1>
                        <img src={Rupee} alt='rupee' className='rupee-icon'/>
                        {place.price} 
                        <span className='grey-place'>
                        {place?.type === 'House Rental' || place?.type === 'Flat Rental' || 
                        place?.type ==='Hostel' || place?.type ==='Paying guest'?
                        ' - per month': ' - per night'}
                    </span>
                    </h1>
                    <div className='display-amenities'>
                        {amenitiesElem}
                    </div>
                </div>
                <div className='rating'>
                    <Rating placeId={place._id}/>
                </div>
                <img src={wishlist? HeartRed:Heart} alt='heart' 
                className='heart-icon' onClick={handleHeart}/>
                 </Link>
            </div>
    )
}


// import Bedroom from '../../icons/bedroom.png'
// import Kitchen from '../../icons/kitchen.png'
// import Livingroom from '../../icons/living-room.png'
// import Washroom from '../../icons/toilet.png'

// import ac from '../../icon/air-conditioner.png'
// import bed from '../../icon/bed.png'
// import firePlace from '../../icon/fireplace.png'
// import furniture from '../../icon/furniture.png'
// import parking from '../../icon/parking-area.png'
// import patio from '../../icon/coffee-shop.png'
// import pool from '../../icon/swimming-pool.png'
// import washing from '../../icon/washing-machine.png'
// import wifi from '../../icon/wifi.png'
// import tv from '../../icon/tv.png'
// import water from '../../icon/water-tap.png'
// import yard from '../../icon/fences.png'
// import kitchenBasic from '../../icon/spatula.png'
// import fan from '../../icon/ceiling-fan.png'
// import backupElectricity from '../../icon/generator.png'
// import refrigerator from '../../icon/refrigerator.png'
// import cityView from '../../icon/cityscape.png'
// import mountainView from '../../icon/waterfall.png'
// import freshAir from '../../icon/clean-air.png'
// import hotWater from '../../icon/bathtub.png'