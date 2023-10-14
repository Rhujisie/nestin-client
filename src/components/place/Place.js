import { useParams } from 'react-router-dom'
import axios from '../../api/axios'
import { useEffect, useState, useRef } from "react"
import useAuth from '../../hooks/useAuth'
import Rating from '../review/Rating'
import Review from '../review/Review'
import Photos from './Photos'

import Rupee from '../../icon/rupee-black.png'
import Bedroom from '../../icon/bedroom.png'
import Kitchen from '../../icon/kitchen.png'
import Livingroom from '../../icon/sofa.png'
import Washroom from '../../icon/sink.png'

export default function MyPlace(){

    const [place, setPlace] = useState()
    const [reviews, setReviews] = useState()
    const [errMsg, setErrMsg] = useState()
    const {id} = useParams()
    const {auth} = useAuth()
    const errRef = useRef()

    //update points
    // useEffect(()=>{
    //     const getPoints = async()=>{
    //         try{    
    //             await axios.get(`/place/points/${id}`)
    //             console.log('points')
    //         }catch(err){
    //             console.log(err)
    //         }
    //     }
    //     //getPoints()
    // },[])

    //get a place
    useEffect(()=>{
        const getPlace = async()=>{
            try{
                const {data} = await axios.get(`/main/${id}`)
                setPlace(data)
            }catch(err){
                console.log(err)
            }
        }
        getPlace()
    },[])

    //get review on place
    useEffect(()=>{
        const getReview = async()=>{
            const {data} = await axios.get(`/review/comment/${id}`)
            setReviews(data)
        }
        getReview()
    },[])

    //erasing error on place change
    useEffect(()=>{
        setErrMsg('')
    },[place])

    //handleContactOwner
    const handleContactOwner=()=>{

    }

    const reviewElem = reviews?.map((review, i)=><Review key={i} review={review}/>)

    return(
        <div className='my-place'>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}aria-live="assertive">
                        {errMsg}
            </p>
            {place && <>
            <div className='myPlace-heading'>
                <h2 className='page-sub-heading'>{place?.name}</h2>
                <h2 className='page-sub-heading' style={{fontSize: '14px'}}>Type: {place?.type}</h2>
            </div>
            <div className='image-container'>
                <Photos photos={place.photos}/>
            </div>
            <div className='gap'>
                <div className='rating-place'>
                        <Rating placeId={id}/>
                </div>
                <div className='page-sub-heading'>
                    <span className='grey-place' style={{fontSize: '14px'}}>Location: </span>
                         {place?.address}, {place?.city}, {place?.district}</div>
                <div className='page-sub-heading'>
                <span className='grey-place' style={{fontSize: '14px'}}>Landmark: </span>
                    {place?.landmark}</div>
            </div>
            <hr className='seperator'/>
            <div><span className="accomodation-heading">Price:</span> <img src={Rupee} alt="rupee" className='rupee-icon'/>
                {place?.price} 
                <span>
                        {place?.type === 'House Rental' || place?.type === 'Flat Rental' || 
                        place?.type ==='Hostel' || place?.type ==='Paying guest'?
                        ' - per month': ' - per night'}
                </span>
            </div>
           {place.deposit !== 0 &&
            <div style={{margin: '10px 0'}}>
                <span className="accomodation-heading">Deposit:</span> <img src={Rupee} alt="rupee" className='rupee-icon'/>
             {place.deposit}
            </div>}
            <div style={{fontSize: '14px'}}>{place?.type} hosted by {auth.name}</div>
            <hr className='seperator'/>
            <h2 className="accomodation-heading">Details.</h2>
            <div className='detail-container'>
                {place?.bedroom && <div className="bedroom">
                    <div><img src={Bedroom} alt='bedroom'/></div>
                    <div>{place?.bedroom} Bedroom</div> 
                </div>}
                {place?.livingroom && <div className="living-room">
                    <div><img src={Livingroom} alt='livingroom'/></div>
                    <div>{place?.livingroom} livingroom</div>
                </div>}
                {place?.kitchen && <div className="kitchen">
                    <div><img src={Kitchen} alt='kitchen'/></div>
                    <div>{place?.kitchen} Kitchen</div>
                </div>}
                {place?.washroom &&<div className="washroom">
                    <div><img src={Washroom} alt='washroom'/></div>
                    <div>{place?.washroom} Washroom</div>
                </div>}
            </div>
            <hr className='seperator'/>
            <div>
                <h2 className="accomodation-heading">Description.</h2>
                <div className='para'>{place?.description}.</div>
            </div>
            <hr className='seperator'/>
            <div>
                <h2 className="accomodation-heading">What this place offers?</h2>
                <div className='amenities-container'>
                    {place?.amenities.map(data=> <div key={data}>
                        {data}
                    </div>)}
                </div>
            </div>
            <hr className='seperator'/>
            <div>
                <h2 className="accomodation-heading">Contact owner.</h2>
                <button onClick={handleContactOwner}>Ask Owner for Contact</button>
            </div>      
            <hr className='seperator'/>
            <h2 className="accomodation-heading">Reviews.</h2>
            {reviews?.length? reviewElem: <div className='para'> No reviews.</div>}
            </>}
        </div>
    )
}