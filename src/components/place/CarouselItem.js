export default function CarouselItem({photo}){
    return(
        <div className='carousel-item'>
            <img alt= 'beautiful images'
                src={`https://nestin-api.onrender.com/uploads/${photo}`}/>
        </div>
    )
}