import { Outlet } from "react-router-dom";
import {useEffect } from "react";
import useRefresh from "../../hooks/useRefresh";
import useAuth from "../../hooks/useAuth";


export default function PersistLogin(){
    const refresh = useRefresh()
    const {auth} = useAuth()

    useEffect(()=>{
        const verifyRefreshToken = async()=>{
            try{
                await refresh()
            }catch(err){
                console.log(err)
            }
        }
        (!auth?.accessToken) && verifyRefreshToken()
    },[])
    return(
        <>
            <Outlet/>
        </>
    )
}