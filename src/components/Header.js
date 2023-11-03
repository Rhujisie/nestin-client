import { useEffect, useState } from 'react'
import {Link, NavLink} from 'react-router-dom'
import {motion} from 'framer-motion'

import Search from './search/Search'
import NestLogo from '../icon/nest.png'

export default function Header(){

    const [showHeader, setShowHeader] = useState(false)
    const [search, setSearch] = useState('')

    const [currentPixel, setCurrentPixel] = useState(window.scrollY)

    const displayHeader = ()=>{
        if(window.scrollY <= currentPixel){
            setShowHeader(false)
        }else{
            setShowHeader(true)
        }
        setCurrentPixel(window.scrollY)
    }
    //listen for scroll
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
                <Search search ={search} setSearch={setSearch}/>
            </nav>
        </header>
    )
}