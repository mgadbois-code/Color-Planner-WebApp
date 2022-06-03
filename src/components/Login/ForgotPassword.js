import React, { useEffect, useState } from 'react'
import { useAuthState } from "react-firebase-hooks/auth";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../../firebase";
import './login.css'
import {ReactComponent as BackButton} from '../../back_button.svg'

const ForgotPassword = ({setShowForgotPassword, loginEmail, sendPasswordReset}) => {
    const [email, setEmail] = useState(loginEmail)
  return (
    <div>
      <BackButton className='back-btn' style={{width:'30px', height:'auto',cursor:'pointer'}} onClick={() => setShowForgotPassword(false)} />
        {/* <button className='back-btn' onClick={() => setShowForgotPassword(false)}>🔙</button> */}
        <h1>Forgot Password</h1>
        <div className="login-form">
            <label htmlFor="email">Email:</label>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} id="email" />
            {!email.includes('@') && email.length > 0 && <p className="sign-up-error">Email not valid</p>}
            <div className="btn-container">

            <button className='send-reset-btn' onClick={async () => {
                    if(sendPasswordReset(email)){
                        setShowForgotPassword(false)
                    }
                }} >Send Reset Email</button>
    
            </div>
        </div>
    </div>
  )
}

export default ForgotPassword