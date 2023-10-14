import { Link, useLocation, useOutletContext } from "react-router-dom";
import usePlace from "../hooks/usePlace";
import { useEffect } from "react";
import Ac from '../icon/air-conditioner.png'
import Bed from '../icon/bed.png'
import FirePlace from '../icon/fireplace.png'
import Furniture from '../icon/furniture.png'
import Parking from '../icon/parking-area.png'
import Patio from '../icon/coffee-shop.png'
import Pool from '../icon/swimming-pool.png'
import Washing from '../icon/washing-machine.png'
import Wifi from '../icon/wifi.png'
import Tv from '../icon/tv.png'
import Water from '../icon/water-tap.png'
import Yard from '../icon/fences.png'
import KitchenBasic from '../icon/spatula.png'
import Fan from '../icon/ceiling-fan.png'
import BackupElectricity from '../icon/generator.png'
import Refrigerator from '../icon/refrigerator.png'
import CityView from '../icon/cityscape.png'
import MountainView from '../icon/waterfall.png'
import FreshAir from '../icon/clean-air.png'
import HotWater from '../icon/bathtub.png'

export default function Amenities(){
    const [completion, setCompletion] = useOutletContext()
    const {place, setPlace} = usePlace()
    const location = useLocation()
    const {id} = location.state

    console.log(place)
    useEffect(()=>{
        setCompletion(4)
        setPlace(prev=>({...prev, 
            amenities:JSON.parse(localStorage.getItem('amenities')) || []}))
    },[])

    useEffect(()=>{
        localStorage.setItem('amenities', JSON.stringify(place.amenities))
    },[place])

    const handleClick=(data)=>{
        const newAmenities = place.amenities.includes(data)? 
        place.amenities.filter(amenitie=> amenitie !== data)
        : [...place.amenities, data]
        setPlace(prev=> ({...prev, amenities: newAmenities}))
    }

    return(
        <div className='amenities'>
            <h2 className="page-heading">
            Sharing the unique features and amenities.</h2>
            <p className="para">Give your guests a glimpse of the unique experience they can expect.</p>
                {id && <div className="changes">Make the necessary Changes</div>}
            <div className="describe-your-place nest-container">
                <button className={place?.amenities?.includes('Wifi')? 'active-place':''} 
                onClick={()=>handleClick('Wifi')}>
                    <div><img src={Wifi} alt='wifi'/></div>
                    <div>Wifi</div>
                </button>
                <button className={place.amenities.includes('Tv')?'active-place':''}
                onClick={()=>handleClick('Tv')}>
                    <div><img src={Tv} alt='tv'/></div>
                    <div>TV</div>
                </button>
                <button className={place.amenities.includes('Yard')? 'active-place':''}
                onClick={()=>handleClick('Yard')}>
                    <div><img src={Yard} alt='yard'/></div>
                    <div>Yard</div>
                </button>
                <button className={place.amenities.includes('Water')? 'active-place':''}
                onClick={()=>handleClick('Water')}>
                    <div><img src={Water} alt='water'/></div>
                    <div>Water</div>
                </button>
                <button className={place.amenities.includes('Washing Machine')? 'active-place':''}
                onClick={()=>handleClick('Washing Machine')}>
                    <div><img src={Washing} alt='washing'/></div>
                    <div>Washing machine</div>
                </button>
                <button className={place.amenities.includes('Parking')? 'active-place':''}
                onClick={()=>handleClick('Parking')}>
                    <div><img src={Parking} alt='parking'/></div>
                    <div>Parking</div>
                </button>
                <button className={place.amenities.includes('Ac')? 'active-place':''}
                onClick={()=>handleClick('Ac')}>
                    <div><img src={Ac} alt='ac'/></div>
                    <div>Air conditioning</div>
                </button>
                <button className={place.amenities.includes('Bed')? 'active-place':''}
                onClick={()=>handleClick('Bed')}>
                    <div><img src={Bed} alt='bed'/></div>
                    <div>Bed</div>
                </button>
                <button className={place.amenities.includes('Furniture')? 'active-place':''}
                onClick={()=>handleClick('Furniture')}>
                    <div><img src={Furniture} alt='furniture'/></div>
                    <div>Furniture</div>
                </button>
                <button className={place.amenities.includes('Pool')? 'active-place':''}
                onClick={()=>handleClick('Pool')}>
                    <div><img src={Pool} alt='pool'/></div>
                    <div>Pool</div>
                </button>
                <button className={place.amenities.includes('Patio')? 'active-place':''}
                onClick={()=>handleClick('Patio')}>
                    <div><img src={Patio} alt='patio'/></div>
                    <div>Patio</div>
                </button>
                <button className={place.amenities.includes('Fire Place')? 'active-place':''}
                onClick={()=>handleClick('Fire Place')}>
                    <div><img src={FirePlace} alt='fire place'/></div>
                    <div>Fire place</div>
                </button>
                <button className={place.amenities.includes('Kitchen Basics')? 'active-place':''}
                onClick={()=>handleClick('Kitchen Basics')}>
                    <div><img src={KitchenBasic} alt='Kitchen Basics'/></div>
                    <div>Kitchen basics</div>
                </button>
                <button className={place.amenities.includes('Fan')? 'active-place':''}
                onClick={()=>handleClick('Fan')}>
                    <div><img src={Fan} alt='fan'/></div>
                    <div>Fan</div>
                </button>
                <button className={place.amenities.includes('Backup Electricity')? 'active-place':''}
                onClick={()=>handleClick('Backup Electricity')}>
                    <div><img src={BackupElectricity} alt='Backup Electricity'/></div>
                    <div>Backup electricity</div>
                </button>
                <button className={place.amenities.includes('Refrigerator')? 'active-place':''}
                onClick={()=>handleClick('Refrigerator')}>
                    <div><img src={Refrigerator} alt='refrigerator'/></div>
                    <div>Refrigerator</div>
                </button>
                <button className={place.amenities.includes('City View')? 'active-place':''}
                onClick={()=>handleClick('City View')}>
                    <div><img src={CityView} alt='city view'/></div>
                    <div>City view</div>
                </button>
                <button className={place.amenities.includes('Mountain View')? 'active-place':''}
                onClick={()=>handleClick('Mountain View')}>
                    <div><img src={MountainView} alt='mountain view'/></div>
                    <div>Mountain view</div>
                </button>
                <button className={place.amenities.includes('Fresh Air')? 'active-place':''}
                onClick={()=>handleClick('Fresh Air')}>
                    <div><img src={FreshAir} alt='Fresh Air'/></div>
                    <div>Fresh air</div>
                </button>
                <button className={place.amenities.includes('Hot Water')? 'active-place':''}
                onClick={()=>handleClick('Hot Water')}>
                    <div><img src={HotWater} alt='Hot Water'/></div>
                    <div>Hot water</div>
                </button>
            </div>
            <div className='next-button'>
                {/* edit this */}
                <Link to={'/nestyourhome/photos'} 
                state={{id: id}}> Next
                </Link>
            </div>
        </div>
    )
}
