import { useEffect} from "react"
import usePlace from "../../hooks/usePlace"
import { useParams } from "react-router-dom"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"

export default function UpdatePlace(){
    const {place, setPlace} = usePlace()
    const {id} = useParams()
    const axiosPrivate = useAxiosPrivate()

    useEffect(()=>{
        const getPlace = async()=>{
            const {data} = await axiosPrivate.get(`/place/${id}`)
            setPlace(data)
        }
        getPlace()
    },[])
    console.log(place)
    return(
        <div className="update-place">
            <form>
                
            </form>
        </div>
    )
}