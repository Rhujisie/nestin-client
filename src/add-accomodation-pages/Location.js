import { useOutletContext, Link, useLocation } from "react-router-dom"
import usePlace from "../hooks/usePlace"
import { useEffect } from "react"

export default function Location(){

    const [completion,setCompletion] = useOutletContext()
    const {place,setPlace} = usePlace()
    const location = useLocation()
    const {id} = location.state

    useEffect(()=>{
        setCompletion(2)
        setPlace(prev=>({...prev,
            district: localStorage.getItem('district') || '', 
            city: localStorage.getItem('city') || '',
            address: localStorage.getItem('address') || '',
            landmark: localStorage.getItem('landmark') || ''}))
    },[])

    useEffect(()=>{
        localStorage.setItem('district', place.district)
        localStorage.setItem('city', place.city)
        localStorage.setItem('address', place.address)
        localStorage.setItem('landmark', place.landmark)
    },[place])

    const handleChange=(e)=>{
        setPlace(prev=>({...prev, [e.target.name]: e.target.value}))
    }
    console.log(place)
    return(
        <div className="location">
            <h2 className="page-heading">Make your location easily accessible.</h2>
            <p className="para">Help them envision the convenience and proximity of your place.</p>
            {id && <div className="changes">Make the necessary Changes</div>}
            <form className="location-container nest-container">
                <input type='text' placeholder=" *  City/ Town" required
                    value={place.city} name='city' onChange={handleChange}/>
                <input type='text' placeholder=" *  Street address" required
                    value={place.address} name='address' onChange={handleChange}/>
                <input type='text' placeholder=" *  Nearby landmark" required
                    value={place.landmark} name='landmark' onChange={handleChange}/>
                <input type='text' placeholder=" *  District" required
                    value={place.district} name="district" onChange={handleChange}/>
            </form>
            <div className='next-button'>
                <Link to={place?.landmark? '/nestyourhome/details': null} 
                state={{id: id}}>
                     Next
                </Link>
            </div>
        </div>
    )
}