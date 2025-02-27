import React, { useState, useEffect, useRef } from 'react'
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

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  // Référence au menu burger pour gérer les clics extérieurs

  const burgerMenuRef = useRef(null)

  useEffect(() => {
    fetch('/data.json')
      .then(response => response.json())
      .then(data => {
        const uniqueCategories = Array.from(new Set(data.map(product => product.category)))
        setCategories(uniqueCategories)
      })
      .catch(error => console.error('Erreur de chargement des catégories:', error))
  }, [])

  // Fermer le Burger Menu lorsqu'on clique en dehors

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (burgerMenuRef.current && !burgerMenuRef.current.contains(event.target)) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  // Déconnexion

  const handleLogout = () => {
    dispatch(logout())
  }

  // Ferme le Burger Menu lorsqu'un lien est cliqué

  const handleLinkClick = () => {
    setIsMenuOpen(false)
  }

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1>Candy Shop <LuCandy /></h1>
      </div>

      {/* Affichage des catégories dans la NavBar */}

      <div className="navbar-categories">
        {categories.map(category => (
          <Link
            key={category}
            to={`/category/${category}`}
            className={`category-link ${location.pathname.includes(`/category/${category}`) ? 'active' : ''}`}
            onClick={handleLinkClick}  // Ferme le menu burger lorsque ce lien est cliqué
          >
            {category}
          </Link>
        ))}
      </div>

      <div className="navbar-right">
        <Link
          to="/"
          className={location.pathname === '/' ? 'active' : ''}
          onClick={handleLinkClick}
        >
          Accueil
        </Link>
        <Link
          to="/cart"
          className={location.pathname === '/cart' ? 'active' : ''}
          onClick={handleLinkClick}
        >
          🛒 Panier
        </Link>

        {/* Affichage du bouton de déconnexion si l'utilisateur est connecté */}

        {user ? (
          <>
            <button onClick={handleLogout} className="logout-btn">Déconnexion</button>
          </>
        ) : (
          <button onClick={() => setIsModalOpen(true)} className="login-btn">Connexion</button>
        )}
      </div>

      {/* Burger Menu */}

      <div className="burger-menu" ref={burgerMenuRef}>
        <Menu
          right
          noOverlay
          width={'250px'}
          customBurgerIcon={<img src="public/img/candy.svg" />}
          isOpen={isMenuOpen}
          onStateChange={({ isOpen }) => setIsMenuOpen(isOpen)}
          className="scale-down-menu"
        >
          <Link
            to="/"
            className={location.pathname === '/' ? 'active' : ''}
            onClick={handleLinkClick}
          >
            🏠 Accueil
          </Link>
          <Link
            to="/cart"
            className={location.pathname === '/cart' ? 'active' : ''}
            onClick={handleLinkClick}
          >
            🛒 Panier
          </Link>

          {user ? (
            <>
              <button onClick={handleLogout} className="logout-btn">Déconnexion</button>
            </>
          ) : (
            <button onClick={() => setIsModalOpen(true)} className="login-btn">Connexion</button>
          )}

          {/* Affichage des catégories dans le Burger Menu */}

          <div className="burger-categories">
            {categories.map(category => (
              <Link
                key={category}
                to={`/category/${category}`}
                className={`category-link ${location.pathname.includes(`/category/${category}`) ? 'active' : ''}`}
                onClick={handleLinkClick}
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
