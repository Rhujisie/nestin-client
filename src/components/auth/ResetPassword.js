import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate} from "react-router-dom";
import axios from "../../api/axios";


const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export default function Reset(){
    const passwordRef = useRef()
    const errRef = useRef()

    const navigate = useNavigate()
    const location = useLocation()

    const email = location.state?.email

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);  

    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');

    //setting focus to name input on load
    useEffect(()=>{
        passwordRef.current.focus()
    }, [])

    //validing passowrd and confirm password
    useEffect(()=>{
        setValidPwd(PWD_REGEX.test(password))
        setValidMatch(password === confirmPassword)
    }, [password, confirmPassword])

    //clear error on state change
    useEffect(() => {
        setErrMsg('');
    }, [password, confirmPassword])

    //handle resigter
    const handleSubmit= async(e)=>{
        e.preventDefault()
        try{
            const {data} = await axios.patch('/resetpassword', {email: email,password: password})
            navigate('/login', {replace: true})
        }catch(err){
            setErrMsg(err.response.data.msg)
            errRef.current.focus()
        }
    }
    return(
        <div className="register">
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}aria-live="assertive">
                {errMsg}
             </p>
            <h4>Reset Password</h4>
            <form onSubmit={handleSubmit} className="register-form">

                <input type='password' placeholder="password" name='password'
                    ref={passwordRef}
                    value={password} onChange={(e)=>setPassword(e.target.value)}
                    className={validPwd? '': 'invalid'}
                    required 
                    aria-invalid={validPwd ? "false" : "true"}
                    aria-describedby="pwdnote"
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                    autoComplete="off"
                    />
                <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                    <li>8 to 24 characters.</li>
                    <li>Must include uppercase and lowercase letters, a number and a special character.</li>
                    <li>Allowed special characters: ! @ # $ %</li>
                </p>
                <input type='password' placeholder="Confirm password" name='confirm-password'
                    value={confirmPassword} onChange={(e)=> setConfirmPassword(e.target.value)}
                    className={validMatch? '': 'invalid'}
                    required 
                    aria-invalid={validMatch ? "false" : "true"}
                    aria-describedby="confirmnote"
                    onFocus={() => setMatchFocus(true)}
                    onBlur={() => setMatchFocus(false)}/>
                <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                    <li>Must match the first password.</li>
                </p>
                <button disabled={!validPwd || !validMatch}
                    className="register-button">
                    Reset password
                </button>
            </form>
        </div>
    )
}