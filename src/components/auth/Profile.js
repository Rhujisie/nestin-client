import { useEffect, useState } from 'react'
import {useLocation, useNavigate, Link} from 'react-router-dom'

import Places from '../place/Places'

import useLogout from '../../hooks/useLogout'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import useUser from '../../hooks/useUser'

import Add from '../../icon/add.png'

export default function Profile(){

    const [places, setPlaces] = useState()
    const {user, setUser} = useUser()
    const axiosPrivate = useAxiosPrivate()
    const logout = useLogout()
    const navigate = useNavigate()
    const location = useLocation()

    //fetch user
    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        //get profile
        const getProfile = async () => {
            try {
                const {data} = await axiosPrivate.get('/profile', {
                    signal: controller.signal
                });
                isMounted && setUser(data);
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
            }
        }
        getProfile();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    //get places
    useEffect(()=>{
        const getPlace = async()=>{
            try{
                const {data} = await axiosPrivate.get('/place')
                setPlaces(data)
              }catch(err){
                console.log(err)
            }
        }
        getPlace()
    },[])
    //logout
    const signOut = async()=>{
        await logout()
        localStorage.clear()
        navigate('/')
    }
    const placesElem = places?.map((place, i)=> <Places place={place} 
    key={i}/>)
    return(
        <>
        <h2 className="page-heading">Profile</h2>
        <div className="profile">
            <div className="profile-header">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div className="profile-name">
                    <div>{user?.name}</div>
                    <div>{user?.email}</div>
                </div>
            </div>
            <button onClick={signOut} className='page-button logout-button'>Logout</button>
            <div className="add-accomodation">
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
            </div>
            {places?.length? <><h2 className="page-sub-heading">My Listing:</h2>
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
        </>
    )
}