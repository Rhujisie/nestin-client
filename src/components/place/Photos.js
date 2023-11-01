import LeftArrow from '../../icon/left-arrow.png'
import Arrow from '../../icon/right-arrow.png'
import CarouselItem from './CarouselItem'
import {useState} from 'react'
import {LayoutGroup, motion} from 'framer-motion'

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

      const arrowVariant = {
        hidden:{opacity: 0},
        visible:{opacity: 1},
        transition: {duration: 1, type: 'spring'}
      }
      

    return (
        <>
            <motion.div className='photos' initial='hidden' 
            whileHover='visible' transition='transition'>
                <div className='carousel'>
                    <div className='inner' 
                        style={{transform: `translateX(-${activeIndex * 100}%)`}}>
                        {imageElem}
                    </div>
                </div>
                <div className='dot-container'>
                    {imageIndexElem}
                </div>
                <LayoutGroup>
                    {activeIndex? <motion.img src={LeftArrow} alt='right arrow' 
                        className='right-chevoron' onClick={handleLeft}
                        variants={arrowVariant}/>: ''}
                    {activeIndex < photos.length - 1?
                        <motion.img src={Arrow} alt='left arrow' 
                        className='left-chevoron' onClick={handleRight}
                        variants={arrowVariant}/>: ''}
                </LayoutGroup>
            </motion.div>
        </>)
}