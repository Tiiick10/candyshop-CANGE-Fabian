import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeFromCart, clearCart, updateQuantity } from '../redux/cartSlice'
import { useNavigate } from 'react-router-dom'
import './CartPage.css'

export default function CartPage() {
  const cart = useSelector(state => state.cart.cart)
  const user = useSelector(state => state.auth.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [orderNumber, setOrderNumber] = useState(null)
  const [showPopup, setShowPopup] = useState(false)

  const handleRemove = (product) => {
    dispatch(removeFromCart(product))
  }

  const handleQuantityChange = (product, newQuantity) => {
    if (newQuantity >= 1) {
      dispatch(updateQuantity({ id: product.id, quantity: newQuantity }))
    } else {
      dispatch(removeFromCart(product))
    }
  }

  const generateOrderNumber = () => {
    return `#${Math.floor(100000 + Math.random() * 900000)}`
  }

  const handleCheckout = () => {
    const newOrderNumber = generateOrderNumber()
    setOrderNumber(newOrderNumber)
    setShowPopup(true)
    dispatch(clearCart())
  }

  const closePopup = () => {
    setShowPopup(false)
    navigate('/')
  }

  const total = cart.reduce((acc, product) => acc + (product.price * product.quantity), 0)

  return (
    <div className="cart-page">
      <h2>Mon Panier</h2>
      {cart.length === 0 ? (
        <p className="empty-cart">Le panier est vide.</p>
      ) : (
        <div className='cart-items'>
          {cart.map(product => (
            <div key={product.id} className="cart-item">
            <img src={product.image} alt={product.name} />
            
            <div className="cart-item-details">
              <h3>{product.name}</h3>
              <p className="price">Prix unitaire: {product.price}€</p>
              <p className="price">Total: {(product.price * product.quantity).toFixed(2)}€</p>
            </div>
          
            <div className="quantity-controls">
              <button onClick={() => handleQuantityChange(product, product.quantity - 1)}>-</button>
              <span>{product.quantity}</span>
              <button onClick={() => handleQuantityChange(product, product.quantity + 1)}>+</button>
            </div>
          
            <button className="remove-btn" onClick={() => handleRemove(product)}>Retirer</button>
          </div>
          ))}
          <div className="total-container">
            <span>Total:</span>
            <span>{total.toFixed(2)}€</span>
          </div>

          {user ? (
            <button onClick={handleCheckout} className="checkout-btn">Passer la commande</button>
          ) : (
            <p className="login-message">
              Veuillez <span onClick={() => navigate('/login')} className="login-link">vous connecter</span> pour passer commande.
            </p>
          )}
        </div>
      )}

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>Merci pour votre commande ! 🎉</h3>
            <p>
              Si vous avez la moindre question, n'hésitez pas à nous contacter à  
              <strong> info@candyshop.be</strong> en mentionnant votre numéro de commande dans l'objet.
            </p>
            <p className="order-number">Commande n° {orderNumber}</p>
            <button className="close-popup-btn" onClick={closePopup}>Fermer</button>
          </div>
        </div>
      )}
    </div>
  )
}
