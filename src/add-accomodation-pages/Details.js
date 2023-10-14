import { useEffect } from "react"
import { Link, useLocation, useOutletContext } from "react-router-dom"
import usePlace from "../hooks/usePlace"

import Add from '../icon/add.png'
import Minus from '../icon/minus.png'
import Bedroom from '../icon/bedroom.png'
import Kitchen from '../icon/kitchen.png'
import Livingroom from '../icon/sofa.png'
import Washroom from '../icon/sink.png'

export default function Details(){

    const [completion, setCompletion] = useOutletContext()
    const {place, setPlace} = usePlace()
    const location = useLocation()
    const {id} = location.state

    useEffect(()=>{
        setCompletion(3)
        setPlace(prev=>({...prev,
            bedroom: JSON.parse(localStorage.getItem('bedroom')) || 1,
            livingroom: JSON.parse(localStorage.getItem('livingroom')) || 1,
            kitchen: JSON.parse(localStorage.getItem('kitchen')) || 1,
            washroom: JSON.parse(localStorage.getItem('washroom')) || 1
        }))
    },[])
    useEffect(()=>{
        localStorage.setItem('bedroom', place.bedroom)
        localStorage.setItem('livingroom', place.livingroom)
        localStorage.setItem('kitchen', place.kitchen)
        localStorage.setItem('washroom', place.washroom)
    },[place])

    const handleAdd = (e)=>{
        const name = e.target.name
        const value = place[name]
        setPlace(prev=>({...prev, [e.target.name]: value + 1}))
    }
    const handleMinus = (e)=>{
        const name = e.target.name
        const value = place[name]
        if(value === 0) return
        setPlace(prev=>({...prev, [e.target.name]: value - 1}))
    }
    console.log(place)
    return(
        <div className='details'>
            <h2 className="page-heading">
                Share some details about your place.</h2>
                <p className="para">Indicate the number of rooms, to provide guests a clear understanding 
                    of the accommodations your place offers.</p>
                {id && <div className="changes">Make the necessary Changes</div>}
            <div className='details-container nest-container'>
                <div className="bedroom">
                    <div className="defination">
                        Bedroom <img src={Bedroom} alt='bedroom' className="detail-icon"/>
                    </div>
                    <img src={Minus} alt='minus' name='bedroom' onClick={handleMinus}/>
                    <div className="count">{place.bedroom}</div>
                    <img src={Add} alt="add" name='bedroom' onClick={handleAdd}/>
                </div>
                <div className="living-room">
                    <div className="defination">
                        Living room <img src={Livingroom} alt='livingroom' className="detail-icon"/>
                    </div>
                    <img src={Minus} alt='minus' name='livingroom' onClick={handleMinus}/>
                    <div className="count">{place.livingroom}</div>
                    <img src={Add} alt="add" name='livingroom' onClick={handleAdd}/>
                </div>
                <div className="kitchen">
                    <div className="defination">
                        Kitchen <img src={Kitchen} alt='kitchen' className="detail-icon"/>
                    </div>
                    <img src={Minus} alt='minus' name='kitchen' onClick={handleMinus}/>
                    <div className="count">{place.kitchen}</div>
                    <img src={Add} alt="add" name='kitchen' onClick={handleAdd}/>
                </div>
                <div className="washroom">
                    <div className="defination">
                        Washroom <img src={Washroom} alt='washroom' className="detail-icon"/>
                        </div>
                    <img src={Minus} alt='minus' name='washroom' onClick={handleMinus}/>
                    <div className="count">{place.washroom}</div>
                    <img src={Add} alt="add" name='washroom' onClick={handleAdd}/>
                </div>
            </div>
            <div className='next-button'>
                <Link to={'/nestyourhome/amenities'} 
                state={{id: id}}> Next
                </Link>
            </div>
        </div>
    )
}