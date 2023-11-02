import {useEffect, useRef, useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import {motion} from 'framer-motion'

import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";

export default function Login(){

    const {setAuth} = useAuth()
    const navigate = useNavigate()
    const userRef = useRef()
    const errRef = useRef()

    const [loginData, setLoginData] = useState({
        email: '', password: ''
    })

    const [errMsg, setErrMsg] = useState('')

     //setting focus on email input on page load
     useEffect(()=>{
        userRef.current.focus()
    }, [])

    //cleaning up error
    useEffect(()=>{
        setErrMsg('')
    },[loginData])
    //handle login state change
    const handleChange=(e)=>{
        setLoginData(prev=>({...prev, [e.target.name]: e.target.value}))
    }
    //handle login
    const handleLogin= async(e)=>{
        e.preventDefault()
       try{
        const {data} = await axios.post('/login', loginData,{
            headers:{'Content-Type': 'application/json'}
        })
        setAuth(data)
        navigate('/',{replace: true})
       }catch(err){
        console.log(err)
        setErrMsg(err.response.data.msg)
        errRef.current.focus()
       }
    }

    return(
                <div className="login">
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}aria-live="assertive">
                        {errMsg}
                    </p>
                    <h4>Login</h4>
                    <form onSubmit={handleLogin}>
                        <input type='email' placeholder="email"
                                ref={userRef}
                                value={loginData.email}
                                name='email'
                                onChange={handleChange}
                                required
                                autoComplete="off"
                        />
                        <input type='password' placeholder="password"
                                value={loginData.password}
                                name='password'
                                onChange={handleChange}
                                required
                                autoComplete="off"
                        />
                        <motion.button className="page-button"
                        whileHover={{scale: 1.1}}
                        whileTap={{scale: .9}}>Login</motion.button>
                    </form>
                    {/* styling not done */}
                    <div className="forgot-passowrd">
                        <Link to='/recovery' style={{color: 'blue'}}>Forgot Password?</Link>
                    </div>
                    <div className="register-link">
                        Don't have an account yet? 
                        <Link to='/register' style={{color: 'blue'}}> Register Now.</Link>
                    </div>
            </div>        
    )
}