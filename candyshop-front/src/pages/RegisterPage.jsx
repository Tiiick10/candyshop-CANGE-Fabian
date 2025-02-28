import React, { useState } from "react"
import "./RegisterPage.css"

export default function RegisterPage({ isOpen, onClose, openLogin }) {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  if (!isOpen) return null

  const handleRegister = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")
  
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.")
      return
    }
  
    try {
      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      })
  
      const data = await response.json()
  
      if (!response.ok) {
        throw new Error(data.message || "Erreur lors de l'inscription")
      }
  
      setSuccess("Compte créé avec succès ! Vous pouvez maintenant vous connecter.")
  
      // Réinitialisation des champs après inscription

      setUsername("")
      setEmail("")
      setPassword("")
      setConfirmPassword("")
  
      setTimeout(openLogin, 2000) // Ouvre connexion après 2s
    } catch (error) {
      setError(error.message)
    }
  }
  

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>✖</button>
        <h2>Inscription</h2>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Nom d'utilisateur"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Adresse email"
            value={email}
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
          <input
            type="password"
            placeholder="Confirmer le mot de passe"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit" className="registerBtn">S'inscrire</button>
        </form>
        <p className="login-link">
          Déjà un compte ?{" "}
          <span onClick={openLogin} className="switch-modal-login">Se connecter</span>
        </p>
      </div>
    </div>
  )
}
