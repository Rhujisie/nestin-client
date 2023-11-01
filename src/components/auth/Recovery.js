import axios from "../../api/axios";
import {useEffect, useRef, useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function Recovery(){

    const navigate = useNavigate()

    const emailRef = useRef()
    const errRef = useRef()

    const [email, setEmail] = useState('')
    const [otp, setOtp] = useState('')
    const [recieveOTP, setRecieveOTP] = useState(false)
    const [errMsg, setErrMsg] = useState('')

     //setting focus on email input on page load
     useEffect(()=>{
        emailRef.current.focus()
    }, [])
    //cleaning up error
    useEffect(()=>{
        setErrMsg('')
    },[email])
    //handle login
    const handleSendOTP= async(e)=>{
        console.log('generate')
        e.preventDefault()
       try{
            await axios.post('/generateotp', {email: email},{
            headers:{'Content-Type': 'application/json'}
        })
        setRecieveOTP(true)
       }catch(err){
        console.log(err)
        setErrMsg(err.response.data.msg)
        errRef.current.focus()
       }
    }
    const handleVerifyOTP= async(e)=>{
        console.log('verify')
        e.preventDefault()
        try{
            await axios.post('/verifyotp', {otp: otp, email: email},{
                headers:{'Content-Type': 'application/json'}
            })
            navigate(`/reset`,{state:{email:email}, replace: true})
        }catch(err){
            setErrMsg(err.response.data.msg)
            errRef.current.focus()
        }
    }

    return(
                <div className="recovery">
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}aria-live="assertive">
                        {errMsg}
                    </p>
                    <h4>Forgot password</h4>
                    <form>
                        <input type='email' placeholder="email"
                                ref={emailRef}
                                value={email}
                                name='email'
                                onChange={(e)=>setEmail(e.target.value)}
                                required
                                autoComplete="off"
                        />
                        {recieveOTP?<>
                            <input type="Number" placeholder="Enter OTP"
                                    value={otp}
                                    name='otp'
                                    onChange={(e)=>setOtp(e.target.value)}
                                    required
                            />
                            <button className="page-button" onClick={handleVerifyOTP}>Verify OTP</button>
                        </>:
                        <button className="page-button" onClick={handleSendOTP}>Send OTP</button>
                        }
                    </form>
            </div>        
    )
}