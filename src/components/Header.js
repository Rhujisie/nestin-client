import { useEffect, useState } from 'react'
import {Link, NavLink} from 'react-router-dom'
import {motion} from 'framer-motion'

import useLocation from '../hooks/useLocation'

import NestLogo from '../icon/nest.png'
import PinLogo from '../icon/pin.gif'

const city = ["Kohima", "Dimapur", "Wokha", "Meluri", "Phek", "Kiipheri",
 "Chumu", "Jalukie", "Lephori", "Peren", "Neiland", "Visema"]

export default function Header(){

    const [showHeader, setShowHeader] = useState(false)
    const [currentPixel, setCurrentPixel] = useState(window.scrollY)
    const {location, setLocation} = useLocation()

    const displayHeader = ()=>{
        if(window.scrollY <= currentPixel){
            setShowHeader(false)
        }else{
            setShowHeader(true)
        }
        setCurrentPixel(window.scrollY)
    }
    useEffect(()=>{
        window.addEventListener('scroll', displayHeader)
        return()=>{
        window.removeEventListener('scroll', displayHeader)

        }
    })

    return(
        <header className={showHeader?'': 'active-header'}>
            <div className='types-of-places'>
               <motion.div className='header-filter'
               whileHover={{scale: 1.1}} whileTap={{scale: .9}}> 
                    <NavLink to='/' className={({isActive})=>
                    isActive? 'active': ''}>All</NavLink>
                </motion.div>
                <motion.div className='header-filter'
                whileHover={{scale: 1.1}} whileTap={{scale: .9}}>
                    <NavLink to='rent' className={({isActive})=>
                    isActive? 'active': ''}>Rent</NavLink>
                </motion.div>
                <motion.div className='header-filter'
                whileHover={{scale: 1.1}} whileTap={{scale: .9}}>
                    <NavLink to='homestay' className={({isActive})=>
                    isActive? 'active': ''}>Home stay</NavLink>
                </motion.div>
                <motion.div className='header-filter'
                whileHover={{scale: 1.1}} whileTap={{scale: .9}}>
                    <NavLink to='hotel' className={({isActive})=>
                    isActive? 'active': ''}>Hotel</NavLink>
                </motion.div>
                <motion.div className='header-filter'
                whileHover={{scale: 1.1}} whileTap={{scale: .9}}>
                    <NavLink to='hostel' className={({isActive})=>
                    isActive? 'active': ''}>Hostel</NavLink>
                </motion.div>
               <motion.div className='header-filter'
               whileHover={{scale: 1.1}} whileTap={{scale: .9}}>
                    <NavLink to='pg' className={({isActive})=>
                    isActive? 'active': ''}>PG</NavLink>
                </motion.div>
            </div>
            <nav>
                <div className='nestin-logo'>
                    <Link to='/'>  
                        <motion.img src={NestLogo} alt='nest' className='nest-logo'
                        whileHover={{scale: 1.1}} whileTap={{scale: .9}}/>
                    </Link>
                    <div className='nestin'>NestIn</div>
                </div>
                <div className='search'>
                    <input list="place" id='location' placeholder='Search...'
                        value={location} onChange={(e)=>setLocation(e.target.value)}/>
                    <label className='location-logo' htmlFor='location'>
                        <img src={PinLogo} alt='pin' className='pin-logo'/>
                    </label>
                    {/* <div>{city.map((data)=><div key={data}>{data}</div>)}</div> */}
                </div>
            </nav>
        </header>
    )
}