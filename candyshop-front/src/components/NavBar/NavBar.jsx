import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";
import LoginPage from "../../pages/LoginPage";
import RegisterPage from "../../pages/RegisterPage";
import "./NavBar.css";

export default function Navbar() {
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
  };

  const openLogin = () => {
    setIsRegisterModalOpen(false);
    setIsLoginModalOpen(true);
  };

  const openRegister = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(true);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1>Candy Shop 🍬</h1>
      </div>

      <div className="navbar-right">
        {user ? (
          <>
            <span className="navbar-user">Bonjour, {user.username} 👋</span>
            <button onClick={handleLogout} className="logout-btn">Déconnexion</button>
          </>
        ) : (
          <button onClick={() => setIsLoginModalOpen(true)} className="login-btn">Connexion</button>
        )}
      </div>

      <LoginPage isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} openRegister={openRegister} />
      <RegisterPage isOpen={isRegisterModalOpen} onClose={() => setIsRegisterModalOpen(false)} openLogin={openLogin} />
    </nav>
  );
}
