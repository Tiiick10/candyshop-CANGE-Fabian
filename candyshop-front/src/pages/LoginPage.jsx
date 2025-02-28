import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { login } from "../redux/authSlice"
import "./LoginPage.css"

export default function ModalLogin({ isOpen, onClose, openRegister }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const dispatch = useDispatch()

  if (!isOpen) return null

  const handleLogin = async (e) => {
    e.preventDefault()
    setError("")

    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: username, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Erreur de connexion")
      }

      dispatch(login(data.user))
      onClose()
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>✖</button>
        <h2>Connexion</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Adresse email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
          <span onClick={openRegister} className="switch-modal">Créer un compte</span>
        </p>
      </div>
    </div>
  )
}
