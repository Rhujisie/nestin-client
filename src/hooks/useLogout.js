import axios from '../api/axios'
import useAuth from './useAuth'

export default function useLogout(){
    const {setAuth} = useAuth()

    const logout = async()=>{
        localStorage.clear()
        setAuth({})
        try{
            await axios('/logout')
        }catch(err){
            console.log(err)
        }
    }
    return logout
}