import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../redux/authSlice'
import SearchBar from '../SearchBar/SearchBar'
import './NavBar.css'

export default function Navbar() {
  const user = useSelector(state => state.auth.user)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1>Candy Shop 🍬</h1>
      </div>

      <div className="navbar-center">
        <SearchBar />
      </div>

      <div className="navbar-right">
        <Link to="/">Accueil</Link>
        <Link to="/cart">🛒 Panier</Link>

        {user ? (
          <>
            <span className="navbar-user">Bonjour, {user} 👋</span>
            <button onClick={handleLogout} className="logout-btn">Déconnexion</button>
          </>
        ) : (
          <Link to="/login">Connexion</Link>
        )}
      </div>
    </nav>
  )
}
