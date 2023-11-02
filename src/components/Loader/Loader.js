import {motion} from 'framer-motion'
import './Loader.css'
export default function Loader(){
    const loadingElem = []
    for(let i = 0; i < 4; i++){
        loadingElem.push(<motion.div key={i} className="loading-container">
            <motion.div className='loading-img-skeleton' 
            initial={{backgroundColor: 'hsl(200, 20%, 70%)'}}
            animate={{backgroundColor: 'hsl(200, 20%, 90%)'}}
            transition={{repeat: Infinity, duration: 2,
             repeatType: 'reverse'}}></motion.div>
            <div className='loading-des-skeleton'>
                <motion.div className='loading-heading-skeleton' 
                  initial={{backgroundColor: 'hsl(200, 20%, 70%)'}}
                  animate={{backgroundColor: 'hsl(200, 20%, 90%)'}}
                  transition={{repeat: Infinity, duration: 2,
                   repeatType: 'reverse', delay: .2}}></motion.div>
                <motion.div className='loading-heading-skeleton' 
                  initial={{backgroundColor: 'hsl(200, 20%, 70%)'}}
                  animate={{backgroundColor: 'hsl(200, 20%, 90%)'}}
                  transition={{repeat: Infinity, duration: 2,
                   repeatType: 'reverse', delay: .4}}></motion.div>
                <motion.div className='loading-heading-skeleton' 
                 initial={{backgroundColor: 'hsl(200, 20%, 70%)'}}
                 animate={{backgroundColor: 'hsl(200, 20%, 90%)'}}
                 transition={{repeat: Infinity, duration: 2,
                  repeatType: 'reverse', delay: .6}}></motion.div>
                <motion.div className='loading-heading-skeleton' 
                  initial={{backgroundColor: 'hsl(200, 20%, 70%)'}}
                  animate={{backgroundColor: 'hsl(200, 20%, 90%)'}}
                  transition={{repeat: Infinity, duration: 2,
                   repeatType: 'reverse', delay: .8}}></motion.div>
            </div>
        </motion.div>)
    }
    return(
        <div className="loader">
            {loadingElem}
        </div>
    )
}