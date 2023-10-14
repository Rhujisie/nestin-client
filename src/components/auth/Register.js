import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";

const USER_REGEX = /^[A-z][A-z-_\s?]{2,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const PHONE_NUMBER_REGEX = /^\d{10}$/

export default function Register(){

    const userRef = useRef()
    const errRef = useRef()
    const {auth, setAuth} = useAuth()

    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname ||'/'

    const [loginData, setLoginData] = useState(
        {name: '', email: '', phoneNumber: '', password:''})
    
    const [confirmPassword, setConfirmPassword] = useState('')

    const [validName, setValidName] = useState(false)
    const [userNameFocus, setUserNameFocus] = useState(false)

    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);  
    
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);
    
    const [validPhone, setValidPhone] = useState(false);
    const [phoneFocus, setPhoneFocus] = useState(false);

    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');

    console.log(validName,validEmail,validPhone,validMatch,validPwd)

    //setting focus to name input on load
    useEffect(()=>{
        userRef.current.focus()
    }, [])

    //validing name
    useEffect(()=>{
        setValidName(USER_REGEX.test(loginData.name))
    }, [loginData.name])

    //validing email
    useEffect(()=>{
        setValidEmail(EMAIL_REGEX.test(loginData.email))
    }, [loginData.email])
    
    //validing phone number
    useEffect(()=>{
        setValidPhone(PHONE_NUMBER_REGEX.test(loginData.phoneNumber))
    }, [loginData.phoneNumber])

    //validing passowrd and confirm password
    useEffect(()=>{
        setValidPwd(PWD_REGEX.test(loginData.password))
        setValidMatch(loginData.password === confirmPassword)
    }, [loginData.password, confirmPassword])

    //clear error on state change
    useEffect(() => {
        setErrMsg('');
    }, [loginData])
    //handle register state change
    const handleChange=(e)=>{
        setLoginData(prev=> ({...prev, [e.target.name]: e.target.value}))
    }
    //handle resigter
    const handleSubmit= async(e)=>{
        e.preventDefault()
        try{
            const {data} = await axios.post('/register', loginData)
            localStorage.setItem('loggedIn', true)
            setAuth(data)
            navigate(from, {replace: true})
        }catch(err){
            //console.log
            console.log(err)
            setErrMsg(err.response.data.msg)
            errRef.current.focus()
        }
    }
    return(
        <div className="register">
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}aria-live="assertive">
                {errMsg}
             </p>
            <h4>Register</h4>
            <form onSubmit={handleSubmit} className="register-form">
                <input type='text' placeholder="Name" name='name'
                    className={validName? '': 'invalid'}
                    value={loginData.name} onChange={handleChange}
                    ref={userRef} autoComplete='off' required
                    aria-describedby="uidnote"
                    aria-invalid={validName? 'false': 'true'}
                    onFocus={()=>setUserNameFocus(true)}
                    onBlur={()=>setUserNameFocus(false)}
                    />
                 <p id="uidnote" className={userNameFocus && !validName ? "instructions" : "offscreen"}>
                    <li>3 to 24 characters.</li>
                    <li>Must begin with a letter.</li>
                    <li>Letters, underscores, hyphens allowed.</li>
                    
                </p>
                <input type='email' placeholder="email" name='email'
                    value={loginData.email} onChange={handleChange}
                    className={validEmail? '': 'invalid'}
                    required autoComplete="off"
                    aria-invalid={validEmail? 'false':'true'}
                    aria-describedby='emailnote'
                    onFocus={()=>setEmailFocus(true)}
                    onBlur={()=>setEmailFocus(false)}
                    />
                <p id="emailnote" className={emailFocus && !validEmail ? "instructions" : "offscreen"}>
                    <li>example@gmail.com</li>
                </p>
                <input type='number' placeholder="Phone no." name="phoneNumber"
                    value={loginData.phoneNumber} onChange={handleChange}
                    className={validPhone? '': 'invalid'}
                    required
                    aria-invalid={validPhone? 'false':'true'}
                    aria-describedby='phonenote'
                    onFocus={()=>setPhoneFocus(true)}
                    onBlur={()=>setPhoneFocus(false)}
                    />
                <p id="phonenote" className={phoneFocus && !validPhone ? "instructions" : "offscreen"}>
                    <li>10 digits</li>
                </p>
                <input type='password' placeholder="password" name='password'
                    value={loginData.password} onChange={handleChange}
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
                <button disabled={!validName || !validEmail ||
                    !validPhone || !validPwd || !validMatch}
                    className="register-button">
                    Register
                </button>
            </form>
            <div className="register-link">
               Already a member? 
                <Link to='/login' style={{color: 'blue'}}>Login.</Link>
            </div>
        </div>
    )
}