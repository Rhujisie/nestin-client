import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefresh from "../../hooks/useRefresh";
import useAuth from "../../hooks/useAuth";


export default function PersistLogin(){
    const [isLoading, setIsLoading] = useState(true)
    const refresh = useRefresh()
    const {auth} = useAuth()
    console.log('persist login')
    useEffect(()=>{
        let isMounted = true
        const verifyRefreshToken = async()=>{
            try{
                console.log('call verify')
                await refresh()
            }catch(err){
                console.log(err)
            }
            //this will run irregardless(may cause memory leak)
            finally{
                isMounted && setIsLoading(false)
            }
        }

           (!auth?.accessToken)? verifyRefreshToken(): setIsLoading(false)

        //cleaning memory leak(state is changed when component is not mounted)
        return ()=>{
            isMounted = false
        }
    },[])
    return(
        <>
            {isLoading? 
                <p>Loading...</p>:
                <Outlet/>}
        </>
    )
}