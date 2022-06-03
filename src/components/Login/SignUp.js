import { ErrorFactory } from '@firebase/util';
import React, { useEffect, useState } from 'react'
import { useAuthState } from "react-firebase-hooks/auth";
import logo from '../../Color-Planner_Icon.png'
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../../firebase";
import './login.css'
import {ReactComponent as BackButton} from '../../back_button.svg'
const SignUp = ({setShowLogin, setShowSignUp}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [buttonColor, setButtonColor] = useState('create-account-btn-a')
  const [name, setName] = useState('')
  const [user, loading, error] = useAuthState(auth)


useEffect( () => {
  if( email.includes('@') && password == confirmPassword && password.length > 5){
    setButtonColor('create-account-btn-a')
  } else{
    setButtonColor('create-account-btn-b')
  }

},[email, password, confirmPassword])




  return (
    <div>
         <div >
         <BackButton className='back-btn' style={{width:'30px', height:'auto', cursor:'pointer'}} onClick={() => setShowSignUp(false)} />
           <div className="sign-in-header">
              <h1>Create An Account</h1>
              <img src={logo} alt="" />
            </div>
            <div className="login-form">
                <label htmlFor="email">Email:</label>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} id="email" />
                {!email.includes('@') && email.length > 0 && <p className="sign-up-error">Email not valid</p>}
                <label htmlFor="password">Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="password" />
                {password.length < 6 && password.length > 0 && <p className="sign-up-error">Password must be at least 6 characters</p> }
                <label htmlFor="confirm-password" >Confirm Password:</label>
                <input type="password" id="confirm-password" onChange={(e) => setConfirmPassword(e.target.value)} />
                {confirmPassword.length > 5 && confirmPassword != password && <p className="sign-up-error">Does not match</p>}
                <div className="btn-container">
                <div className={buttonColor} onClick={async () => {
                  if(buttonColor == 'create-account-btn-a')
                    if(await registerWithEmailAndPassword(name, email, password)){
                      setShowSignUp(false)
                      setShowLogin(false)
                    }
                  }} >Create Account</div>
        
            </div>
                </div>
        </div>
    </div>
  )
}

export default SignUp