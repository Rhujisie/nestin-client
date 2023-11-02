import axios from "../api/axios";
import useAuth from './useAuth'

export default function useRefresh(){

    const {setAuth} = useAuth()

    const refresh = async()=>{
        try{
            console.log('refresh')
            const {data} = await axios.get('/refresh')
            setAuth(prev=> ({...prev, ...data}))
            return data
        }catch(err){
            return null
        }
    }
    return(refresh)
}