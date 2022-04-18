import React, { useState } from 'react'
import { useAuthState } from "react-firebase-hooks/auth";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../../firebase";
import './login.css'

const SignUp = ({setShowLogin, setShowSignUp}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [user, loading, error] = useAuthState(auth)

  return (
    <div>
         <div >
           <button className='back-btn' onClick={() => setShowSignUp(false)}>🔙</button>
            <h1>Sign Up</h1>
            <div className="login-form">
                <label htmlFor="email">Email:</label>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} id="email" />
                <label htmlFor="password">Password:</label>
                <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} id="password" />
                <label htmlFor="confirm-password">Confirm Password:</label>
                <input type="text" id="confirm-password" />
                <button onClick={() => {registerWithEmailAndPassword(name, email, password);setShowLogin(false)}} >Create Account</button>
        
            </div>
        </div>
    </div>
  )
}

export default SignUp