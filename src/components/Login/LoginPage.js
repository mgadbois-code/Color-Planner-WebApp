import React from 'react'
import { useState } from 'react'
import SignUp from './SignUp'
import './login.css'
import { auth, logInWithEmailAndPassword, signInWithGoogle } from '../../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { collection, getDoc, query, where } from 'firebase/firestore'

import { db } from '../../firebase'

const LoginPage = ({setShowLogin, setGoals, setCompleted}) => {
    const [showSignUp, setShowSignUp] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [user, loading, error] = useAuthState(auth)
    

  
  
  


  return (
    <div className="login-container" onClick={(event) => event.stopPropagation()}>
            {showSignUp ?
            <SignUp setShowLogin={setShowLogin} setShowSignUp={setShowSignUp} /> :
        <div >
            <h1>Sign In</h1>
            <div className="login-form">
                <label htmlFor="email">Email:</label>
                <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <label htmlFor="password">Password:</label>
                <input type="text" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button onClick={async () => { let [goals, completed] = await logInWithEmailAndPassword(email, password);setShowLogin(false);
                  goals.sort((a,b) => b.id - a.id);setGoals(goals);
                  completed.sort((a,b) => b.id - a.id); setCompleted(completed)}} >Sign in</button>
                <p>or</p>
                <button onClick={async () => {let [goals, completed] = await signInWithGoogle()
                setShowLogin(false)
                goals.sort((a,b) => b.id - a.id);setGoals(goals);
                completed.sort((a,b) => b.id - a.id); setCompleted(completed)}} >Sign in With Google</button>
                <p id='create-account' onClick={() => setShowSignUp(true)}>Create an Account</p>
            </div>
        </div>
            }
    </div>
  )
}

export default LoginPage