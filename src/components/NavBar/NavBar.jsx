import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../redux/authSlice'
import LoginPage from '../../pages/LoginPage'
import { scaleDown as Menu } from 'react-burger-menu'
import './NavBar.css'
import { LuCandy } from "react-icons/lu"

export default function Navbar() {
  const user = useSelector(state => state.auth.user)
  const dispatch = useDispatch()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [categories, setCategories] = useState([])
  const location = useLocation()

  useEffect(() => {
    fetch('/data.json')
      .then(response => response.json())
      .then(data => {
        const uniqueCategories = Array.from(new Set(data.map(product => product.category)))
        setCategories(uniqueCategories)
      })
      .catch(error => console.error('Erreur de chargement des catégories:', error))
  }, [])

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1>Candy Shop <LuCandy /></h1>
      </div>

      {/* Affichage normal des catégories en mode desktop */}

      <div className="navbar-categories">
        {categories.map(category => (
          <Link
            key={category}
            to={`/category/${category}`}
            className={`category-link ${location.pathname.includes(`/category/${category}`) ? 'active' : ''}`}
          >
            {category}
          </Link>
        ))}
      </div>

      {/* Navbar droite affichée uniquement en mode desktop */}

      <div className="navbar-right">
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Accueil</Link>
        <Link to="/cart" className={`${location.pathname === '/cart' ? 'active' : ''}`}>🛒 Panier</Link>

        {user ? (
          <>
            <span className="navbar-user">Bonjour, {user} 👋</span>
            <button onClick={handleLogout} className="logout-btn">Déconnexion</button>
          </>
        ) : (
          <button onClick={() => setIsModalOpen(true)} className="login-btn">Connexion</button>
        )}
      </div>

      {/* Burger Menu */}

      <div className="burger-menu">
        <Menu right noOverlay width={'250px'} customBurgerIcon={ <img src="public/img/candy.svg" /> } className="scale-down-menu">
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>🏠 Accueil</Link>
          <Link to="/cart" className={`${location.pathname === '/cart' ? 'active' : ''}`}>🛒 Panier</Link>

          {user ? (
            <>
              <span className="navbar-user">Bonjour, {user} 👋</span>
              <button onClick={handleLogout} className="logout-btn">Déconnexion</button>
            </>
          ) : (
            <button onClick={() => setIsModalOpen(true)} className="login-btn">Connexion</button>
          )}

          {/* Liens des catégories dans le Burger Menu */}

          <div className="burger-categories">
            {categories.map(category => (
              <Link
                key={category}
                to={`/category/${category}`}
                className={`category-link ${location.pathname.includes(`/category/${category}`) ? 'active' : ''}`}
              >
                {category}
              </Link>
            ))}
          </div>
        </Menu>
      </div>

      <LoginPage isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </nav>
  )
}
