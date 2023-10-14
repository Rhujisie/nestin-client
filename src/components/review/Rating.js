import StarBlack from '../../icon/star-black.png'
import axios from '../../api/axios'
import { useEffect, useState } from 'react'

export default function Rating({placeId}){

    const [rating, setRating] = useState()
    //get rating
    useEffect(()=>{
        const getRating = async()=>{
            try{
                const {data} = await axios.get(`/review/rating/${placeId}`)
                let result = 0
                let value = []
                if(data){
                    value = Object.values(data)
                    for(let i = 0; i< value.length; i++){
                        result += value[i]
                    }
                    setRating(result/value.length)
                }
            }catch(err){
                console.log(err)
            }
        }
        getRating()
    },[])

    return(
        <>  {rating? <><img src={StarBlack} alt='star' style={{width: '13px'}}
                        className='rating_star'/>
                    <span className='rating_number'>{rating}</span></>: ''}
        </>
    )
}