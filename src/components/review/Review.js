export default function Review({review}){
    return(
        <div className="review">
            <h2 className="accomodation-heading">{review.name}:
             <span style={{fontSize: '13px'}}>"{review.reviews}"</span></h2>
        </div>
    )
}