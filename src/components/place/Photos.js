import LeftArrow from '../../icon/arrow-left.png'
import Arrow from '../../icon/arrow.png'
import CarouselItem from './CarouselItem'
import {useState} from 'react'

export default function Photos({photos}){
    
    const [activeIndex, setActiveIndex] = useState(0)

    //carousel index decrease
    const handleLeft = (e)=>{
        e.preventDefault()
        if(activeIndex === 0) return
        setActiveIndex(prev=> prev - 1)
    }
    //carousel index increase
    const handleRight = (e)=>{
        e.preventDefault()
        if(activeIndex < photos.length - 1){
        setActiveIndex(prev=> prev + 1)
        }
    }
      //carousel index element
      const imageIndexElem = photos.map((photo, i)=> 
      <div key={i} className={activeIndex === i? 'dot dot-active': 'dot'}></div>)
      //carousel image element
      const imageElem = photos.map((photo, i)=> 
      <CarouselItem key={i} photo={photo}/>)

    return (
        <>
            <div className='photos'>
                <div className='carousel'>
                    <div className='inner' 
                        style={{transform: `translateX(-${activeIndex * 100}%)`}}>
                        {imageElem}
                    </div>
                </div>
                <div className='dot-container'>
                {imageIndexElem}
            </div>
                {activeIndex? <img src={LeftArrow} alt='right arrow' 
                    className='right-chevoron' onClick={handleLeft}/>: ''}
                {activeIndex < photos.length - 1? 
                <img src={Arrow} alt='left arrow' 
                    className='left-chevoron' onClick={handleRight}/>: ''}
            </div>
        </>)
}