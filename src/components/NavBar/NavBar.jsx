import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/authSlice';
import SearchBar from '../SearchBar/SearchBar';
import LoginPage from '../../pages/LoginPage';
import './NavBar.css';

export default function Navbar() {
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1>Candy Shop 🍬</h1>
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
          <button onClick={() => setIsModalOpen(true)} className="login-btn">Connexion</button>
        )}
      </div>

      <LoginPage isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </nav>
  );
}
