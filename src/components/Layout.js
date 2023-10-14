import Header from './Header'
import Footer from './Footer'
import NavBase from './NavBase'
import {Outlet} from 'react-router-dom'

export default function Layout(){
    return (
        <>
            <Header/>
            <div className='outlet'>
                <Outlet/>
            </div>
            <Footer/>
            <NavBase/>
        </> 
    )
}