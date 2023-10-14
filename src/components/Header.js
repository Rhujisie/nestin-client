import NestLogo from '../icon/nest.png'
import {Link, NavLink} from 'react-router-dom'

import PinLogo from '../icon/pin.gif'
import { useState } from 'react'

export default function Header(){

    const [showHeader, setShowHeader] = useState(false)
    const [currentPixel, setCurrentPixel] = useState(window.scrollY)

    const displayHeader = ()=>{
        if(window.scrollY <= currentPixel){
            setShowHeader(false)
        }else{
            setShowHeader(true)
        }
        setCurrentPixel(window.scrollY)
    }

    window.addEventListener('scroll', displayHeader)

    return(
        <header className={showHeader?'': 'active-header'}>
            <div className='types-of-places'>
               <div className='header-filter'> 
                    <NavLink to='/' className={({isActive})=>
                    isActive? 'active': ''}>All</NavLink>
                </div>
                <div className='header-filter'>
                    <NavLink to='rent' className={({isActive})=>
                    isActive? 'active': ''}>Rent</NavLink>
                </div>
                <div className='header-filter'>
                    <NavLink to='homestay' className={({isActive})=>
                    isActive? 'active': ''}>Home stay</NavLink>
                </div>
                <div className='header-filter'>
                    <NavLink to='hotel' className={({isActive})=>
                    isActive? 'active': ''}>Hotel</NavLink>
                </div>
                <div className='header-filter'>
                    <NavLink to='hostel' className={({isActive})=>
                    isActive? 'active': ''}>Hostel</NavLink>
                </div>
               <div className='header-filter'>
                    <NavLink to='pg' className={({isActive})=>
                    isActive? 'active': ''}>PG</NavLink>
                </div>
            </div>
            <nav>
                <div className='nestin-logo'>
                    <Link to='/'>  
                        <img src={NestLogo} alt='nest' className='nest-logo'/>
                    </Link>
                    <div className='nestin'>NestIn</div>
                </div>
                <div className='search'>
                    <input list="place" id='location' placeholder='Search...'/>
                    <datalist id="place">
                        <option value="Kohima"/>
                        <option value="Dimapur"/>
                        <option value="Chumu"/>
                        <option value="Wokha"/>
                        <option value="Mokog"/>
                        <option value="Kohima"/>
                        <option value="Dimapur"/>
                        <option value="Chumu"/>
                        <option value="Wokha"/>   
                    </datalist>
                    <label className='location-logo' htmlFor='location'>
                        <img src={PinLogo} alt='pin' className='pin-logo'/>
                    </label>
                </div>
            </nav>
        </header>
    )
}