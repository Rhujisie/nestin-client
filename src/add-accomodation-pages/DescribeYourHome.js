import usePlace from "../hooks/usePlace"

import Home from '../icon/house.png'
import HomeStay from '../icon/homestay.png'
import Hotel from '../icon/resort.png'
import Flat from '../icon/building.png'
import Cabin from '../icon/cabin.png'
import TreeHouse from '../icon/tree-house.png'
import Farm from '../icon/barn.png'
import Tent from '../icon/tent.png'
import TinyHouse from '../icon/tiny-house.png'
import Room from '../icon/living-room.png'
import { Link, useLocation, useOutletContext, useParams} from "react-router-dom"
import { useEffect } from "react"
import useAxiosPrivate from "../hooks/useAxiosPrivate"

export default function DescribeYourHome(){
    const {place,setPlace} = usePlace()
    const [completion, setCompletion] = useOutletContext()
    const {id} = useParams()
    const axiosPrivate = useAxiosPrivate()
    
    console.log(place, id)
    useEffect(()=>{
        setCompletion(1)
        if(!id){
            setPlace(prev=> ({...prev,type: localStorage.getItem('type') || ''}))
        }
        else{
            const getPlace = async()=>{
                const {data} = await axiosPrivate.get(`/place/${id}`)
                setPlace(data)
            }
            getPlace()
        }
    },[])
    useEffect(()=>{
        localStorage.setItem('name', place.name)
                localStorage.setItem('description', place.description)
                localStorage.setItem('price', place.price)
                localStorage.setItem('photos', JSON.stringify(place.photos))
                localStorage.setItem('type', place.type)
                localStorage.setItem('amenities', JSON.stringify(place.amenities))
                localStorage.setItem('bedroom', place.bedroom)
                localStorage.setItem('livingroom', place.livingroom)
                localStorage.setItem('kitchen', place.kitchen)
                localStorage.setItem('washroom', place.washroom)
                localStorage.setItem('district', place.district)
                localStorage.setItem('city', place.city)
                localStorage.setItem('address', place.address)
                localStorage.setItem('landmark', place.landmark)
    },[place])

    return(
        <>
            <h2 className="page-heading">Select which describes your place best.</h2>
            <p className='para'>Choose the description that best encapsulates the structure and character of your place.</p>
            {id && <div className="changes">Make the necessary Changes</div>}
            <div className="describe-your-place nest-container">
                <button className={place.type === 'House Rental'? 'active-place':''} 
                onClick={()=>setPlace(prev=> ({...prev,type: 'House Rental'}))}>
                    <div><img src={Home} alt='cabin icon'/></div>
                    <div>House</div>
                    <div className="grey">Rental</div>
                </button>
                <button className={place.type === 'Flat Rental'? 'active-place':''}
                onClick={()=>setPlace(prev=> ({...prev,type: 'Flat Rental'}))}>
                    <div><img src={Flat} alt='cabin icon'/></div>
                    <div>Flat/Appartment</div>
                    <div className="grey">Rental</div>
                </button>
                <button className={place.type === 'Hotel'? 'active-place':''}
                onClick={()=>setPlace(prev=> ({...prev,type: 'Hotel'}))}>
                    <div><img src={Hotel} alt='cabin icon'/></div>
                    <div>Hotel</div>
                </button>
                <button className={place.type === 'Hostel'? 'active-place':''}
                onClick={()=>setPlace(prev=> ({...prev,type: 'Hostel'}))}>
                    <div><img src={TinyHouse} alt='hostel'/></div>
                    <div>Hostel</div>
                </button>
                <button className={place.type === 'Paying guest'? 'active-place':''}
                onClick={()=>setPlace(prev=> ({...prev,type: 'Paying guest'}))}>
                    <div><img src={Room} alt='room'/></div>
                    <div>Paying guest</div>
                </button>
                
                <button className={place.type === 'House Homestay'? 'active-place':''} 
                onClick={()=>setPlace(prev=> ({...prev,type: 'House Homestay'}))}>
                    <div><img src={Home} alt='cabin icon'/></div>
                    <div>House</div>
                    <div className="grey">Home Stay</div>
                </button>
                <button className={place.type === 'Flat Homestay'? 'active-place':''}
                onClick={()=>setPlace(prev=> ({...prev,type: 'Flat Homestay'}))}>
                    <div><img src={Flat} alt='cabin icon'/></div>
                    <div>Flat/Appartment</div>
                    <div className="grey">Home Stay</div>
                </button>
                <button className={place.type === 'Cabin Homestay'? 'active-place':''}
                onClick={()=>setPlace(prev=> ({...prev,type: 'Cabin Homestay'}))}>
                    <div><img src={Cabin} alt='cabin icon'/></div>
                    <div>Cabin</div>
                    <div className="grey">Home Stay</div>
                </button>
                
                <button className={place.type === 'Tree house Homestay'? 'active-place':''}
                onClick={()=>setPlace(prev=> ({...prev,type: 'Tree house Homestay'}))}>
                    <div><img src={TreeHouse} alt='tree house'/></div>
                    <div>Tree House</div>
                    <div className="grey">Home Stay</div>
                </button>
                <button className={place.type === 'Farm Homestay'? 'active-place':''}
                onClick={()=>setPlace(prev=> ({...prev,type: 'Farm Homestay'}))}>
                    <div><img src={Farm} alt='farm'/></div>
                    <div>Farm</div>
                    <div className="grey">Home Stay</div>
                </button>
                <button className={place.type === 'Tent Homestay'? 'active-place':''}
                onClick={()=>setPlace(prev=> ({...prev,type: 'Tent Homestay'}))}>
                    <div><img src={Tent} alt="tent"/></div>
                    <div>Tent</div>
                    <div className="grey">Home Stay</div>
                </button>
            </div>
            <pre className='para'>Rentals, Hostel and paying guest- monthly payment.
                <br/>Home Stay and Hotel - Daily payment.</pre>
            <div className='next-button'>
                { 
                <Link to={place?.type? '/nestyourhome/location': null} 
                state={{id: id}}>
                     Next
                </Link>
            }
            </div>
        </>
    )
}

