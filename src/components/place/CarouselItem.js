

export default function CarouselItem({photo}){

    return(
        <div className='carousel-item'>
            <img alt= 'beautiful images'
                src={`http://localhost:3000/uploads/${photo}`}/>
        </div>
    )
}