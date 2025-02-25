import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './NavBar.css'

export default function Navbar () {
  const user = useSelector(state => state.auth.user)

  return (
    <nav className="navbar">
      <h1>Candy Shop</h1>
      <p>Bonjour, {user || "Guest"}</p>
      <Link to="/">Accueil</Link>
      <Link to="/cart">Panier</Link>
      <Link to="/login">Connexion</Link>
    </nav>
  )
}

