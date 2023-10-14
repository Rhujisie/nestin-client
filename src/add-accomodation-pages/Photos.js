import {useLocation, useNavigate, useOutletContext} from "react-router-dom";
import usePlace from "../hooks/usePlace"
import { useEffect, useRef, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

//import Upload from '../icon/upload.png'
import Rupee from '../icon/rupee.png'
import Upload from '../icon/cloud-upload.png'
import Star from '../icon/star.png'
import Delete from '../icon/trash.png'
import StarColored from '../icon/star-colored.png'


export default function Photos(){

    const {place, setPlace} = usePlace()
    const [completion, setCompletion] = useOutletContext()
    const [errMsg, setErrMsg] = useState()
    const errRef = useRef()
    const axiosPrivate = useAxiosPrivate()
    const navigate = useNavigate()
    const location  = useLocation()
    const {id} = location.state


    useEffect(()=>{
        setCompletion(5)
        setPlace(prev=>({...prev, 
            name:localStorage.getItem('name') || '',
            description:localStorage.getItem('description') || '',
            price:localStorage.getItem('price') || 0,
            price:localStorage.getItem('deposit') || 0,
            deposit:localStorage.getItem('deposit') || 0,
            type: localStorage.getItem('type') || '',
            photos:JSON.parse(localStorage.getItem('photos')) || [],
            district: localStorage.getItem('district') || '', 
            city: localStorage.getItem('city') || '',
            address: localStorage.getItem('address') || '',
            landmark: localStorage.getItem('landmark') || '',
            bedroom: JSON.parse(localStorage.getItem('bedroom')),
            livingroom: JSON.parse(localStorage.getItem('livingroom')),
            kitchen: JSON.parse(localStorage.getItem('kitchen')),
            washroom: JSON.parse(localStorage.getItem('washroom')),
            amenities:JSON.parse(localStorage.getItem('amenities')) || []
        }))
    },[])
    useEffect(()=>{
        localStorage.setItem('name', place.name)
        localStorage.setItem('description', place.description)
        localStorage.setItem('price', place.price)
        localStorage.setItem('deposit', place.deposit)
        localStorage.setItem('photos', JSON.stringify(place.photos))
    },[place])

    useEffect(()=>{
        setErrMsg('')
    },[place])

    const deletePhoto=(photo)=>{
        const newPhotos = place.photos.filter(data=> data !== photo)
        setPlace(prev=>({...prev, photos: newPhotos}))
    }
    const mainPhoto=(photo)=>{
        const newPhotos = place.photos.filter(data=> data !== photo)
        setPlace(prev=>({...prev, photos: [photo, ...newPhotos]}))
    }
    
    const handleChange =(e)=>{
        setPlace(prev=>({...prev, [e.target.name]: e.target.value}))
    }
    const uploadPhoto = async(e)=>{
        const files = e.target.files
        const file = new FormData()
        for(let i =0; i < files.length; i++){
            file.append('photos', files[i])
        }
        console.log('file', file)
        try{
            const {data} = await axiosPrivate.post('/uploads', file,{
                headers:{
                    'Content-Type': 'multipart/form-data'
                }
            })
            setPlace(prev=>({...prev, photos: [...prev.photos, ...data]}))
        }catch(err){
            console.log(err)
        }
    }
    const handleSubmit = async () =>{
        try{
            if(id) await axiosPrivate.patch(`/place/update/${id}`, place)
            else await axiosPrivate.post('/place', place)
                localStorage.clear()
                setPlace({
                    name: '', description: '', type: '',district:'', city: '', 
                    address: '', landmark: '',bedroom: 1, livingroom: 1, kitchen: 1,
                    washroom: 1, photos: [], amenities: [], price: 0
                })
                navigate('/nestyourhome', {replace: -5})
            
        }catch(err){
            setErrMsg('Fialed to upload your place')
            errRef.current.focus()
        }
   }

    const photoElem = place?.photos?.map((photo, i)=> 
    <div key={i} className="photo-display">
        <img className='photo' alt= 'beautiful images'
                        src={`http://localhost:3000/uploads/${photo}`}/>
        <button onClick={()=>deletePhoto(photo)}>
            <img src={Delete} alt="delete" className="delete-icon"/>
        </button>
        <button onClick={i > 0?(e)=>mainPhoto(photo): null}>
            {i === 0? 
            <img src={StarColored} alt="colored star" className="star-icon"/> 
            :<img src={Star} alt='star' className="star-icon"/>}
        </button>
    </div>)

    return(
        <div className="photos">
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}aria-live="assertive">
                        {errMsg}
            </p>
            <h2 className="page-heading" style={{marginBottom: '40px'}}>
                Make your place stands out by adding a name,
                 meaningful description and photos.</h2>
                 {id && <div className="changes">Make the necessary Changes</div>}
            <form className="photo-form nest-container">
                <input type='text' placeholder='Title - Craft an eye-catching title.' 
                name='name' value={place.name} onChange={handleChange}/>
                <textarea placeholder='Description - Capture the essence of your place, describe your haven, your oasis, your retreat, and welcome guests to experience the unique charm of your home.'
                 name='description' value={place.description} onChange={handleChange}>
                </textarea>
                <div className="price-container">
                    <img src={Rupee} alt="rupee" className="rupee"/>
                    <input type="number" placeholder="Price" name='price' id="price"
                        value={place.price} onChange={handleChange}/>
                    <span className="duration">
                        {place?.type === 'House Rental' || place?.type === 'Flat Rental' || 
                        place?.type ==='Hostel' || place?.type ==='Paying guest'?
                        'per month': 'per night'}
                    </span>
                </div>
                {(place?.type === 'House Rental' || place?.type === 'Flat Rental' || 
                place?.type ==='Hostel' || place?.type ==='Paying guest') && 
                <div className="price-container">
                <img src={Rupee} alt="rupee" className="rupee"/>
                <input type="number" placeholder="Deposit" name='deposit' id="deposit"
                    value={place.deposit} onChange={handleChange}/>
                <span className="duration">
                    Security Deposit
                </span>
            </div>}
                <label className="upload-container">
                    <div>
                        <img src={Upload} alt='upload' className="upload-logo"/>
                    </div>
                    <h3>Add photos</h3>
                    <input type='file' onChange={uploadPhoto} 
                    multiple name='photo' className="hidden"/>
                </label>
            </form>
            <div className='photo-container'>
                {photoElem}
            </div>
            <button onClick={handleSubmit} className="page-button upload-button">Upload place</button>
        </div>
    )
}