import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../redux/authSlice'
import './LoginPage.css'

export default function LoginPage () {
  const [username, setUsername] = useState('')
  const dispatch = useDispatch()

  const handleLogin = () => {
    if (username.trim()) {
      dispatch(login(username))
    }
  }

  return (
    <div className="login">
      <h2>Connexion</h2>
      <input 
        type="text" 
        placeholder="Nom d'utilisateur" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
      />
      <button onClick={handleLogin}>Se connecter</button>
    </div>
  )
}

