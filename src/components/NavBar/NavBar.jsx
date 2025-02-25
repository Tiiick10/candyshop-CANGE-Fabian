import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../redux/authSlice'
import SearchBar from '../SearchBar/SearchBar'
import './NavBar.css'

export default function Navbar() {
  const user = useSelector(state => state.auth.user)
  const cart = useSelector(state => state.cart.cart)
  const dispatch = useDispatch()
  const [showDropdown, setShowDropdown] = useState(false)

  const totalQuantity = cart.reduce((acc, product) => acc + product.quantity, 0)

  const handleLogout = () => {
    dispatch(logout())
  }

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown)
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
        <div 
          className="cart-link" 
          onMouseEnter={toggleDropdown} 
          onMouseLeave={toggleDropdown}
        >
          <Link to="/cart">🛒 Panier</Link>
          {totalQuantity > 0 && (
            <span className="cart-count">{totalQuantity}</span> // Bulle de comptage
          )}

          {/* Dropdown des articles dans le panier */}

          {showDropdown && cart.length > 0 && (
            <div className="dropdown-menu">
              {cart.map(product => (
                <div key={product.id} className="dropdown-item">
                  <img src={product.image} alt={product.name} className="dropdown-item-img" />
                  <div className="dropdown-item-info">
                    <span>{product.name}</span>
                    <span>{product.quantity} x {product.price}€</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

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
