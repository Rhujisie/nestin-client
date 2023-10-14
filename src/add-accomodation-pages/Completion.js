

export default function Completion({completion}){
    const elem = []
    for(let i= 1; i< 6; i++){
        elem.push(<div key={i} className={completion >= i? 'completed': ''}></div>)
    }
    return(
        <div className="completion">
            {elem}
        </div>
    )
}