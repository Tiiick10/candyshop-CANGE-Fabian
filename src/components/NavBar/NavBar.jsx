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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (burgerMenuRef.current && !burgerMenuRef.current.contains(event.target)) {
        
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1>Candy Shop <LuCandy /></h1>
      </div>

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

      <div className="navbar-right">
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Accueil</Link>
        <Link to="/cart" className={`${location.pathname === '/cart' ? 'active' : ''}`}>🛒 Panier</Link>

        {user ? (
          <>
            {/* <span className="navbar-user">Bonjour, {user} 👋</span> */}
            <button onClick={handleLogout} className="logout-btn">Déconnexion</button>
          </>
        ) : (
          <button onClick={() => setIsModalOpen(true)} className="login-btn">Connexion</button>
        )}
      </div>

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
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>🏠 Accueil</Link>
          <Link to="/cart" className={`${location.pathname === '/cart' ? 'active' : ''}`}>🛒 Panier</Link>

          {user ? (
            <>
              {/* <span className="navbar-user">Bonjour, {user} 👋</span> */}
              <button onClick={handleLogout} className="logout-btn">Déconnexion</button>
            </>
          ) : (
            <button onClick={() => setIsModalOpen(true)} className="login-btn">Connexion</button>
          )}

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
