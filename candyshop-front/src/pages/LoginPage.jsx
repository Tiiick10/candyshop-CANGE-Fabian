import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { login } from "../redux/authSlice"
import axios from 'axios'
import "./LoginPage.css"

export default function ModalLogin({ isOpen, onClose, openRegister }) {
  const [email, setEmail] = useState("") // Change `username` en `email`
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const dispatch = useDispatch()

  if (!isOpen) return null

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
  
    console.log("Email:", email);  // Affiche l'email
    console.log("Password:", password);  // Affiche le mot de passe
  
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', { email, password })
      console.log(response.data);  // Vérifie la réponse de l'API
      dispatch(login(response.data.user))
      onClose()
    } catch (err) {
      setError('Identifiants incorrects');
      console.error(err);  // Affiche l'erreur pour le débogage
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content-login">
        <button className="close-btn" onClick={onClose}>✖</button>
        <h2>Connexion</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Adresse email"
            value={email} // Utilise `email` ici
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="connectBtn">Se connecter</button>
        </form>
        <p className="register-link">
          Pas encore de compte ?{" "}
          <span onClick={openRegister} className="switch-modal-register">Créer un compte</span>
        </p>
      </div>
    </div>
  )
}
