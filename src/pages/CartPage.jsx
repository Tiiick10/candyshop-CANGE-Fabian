import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeFromCart, clearCart, updateQuantity } from '../redux/cartSlice'
import './CartPage.css'

export default function CartPage() {
  const cart = useSelector(state => state.cart.cart)
  const user = useSelector(state => state.auth.user)
  const dispatch = useDispatch()

  const handleRemove = (product) => {
    dispatch(removeFromCart(product))
  }

  const handleQuantityChange = (product, newQuantity) => {
    if (newQuantity >= 1) {
      dispatch(updateQuantity({ id: product.id, quantity: newQuantity }))
    }
  }

  const handleCheckout = () => {
    dispatch(clearCart())
    alert('Commande passée avec succès !')
  }

  const total = cart.reduce((acc, product) => acc + (product.price * product.quantity), 0)

  return (
    <div className="cart-page">
      <h2>Mon Panier</h2>
      {cart.length === 0 ? (
        <p className="empty-cart">Le panier est vide.</p>
      ) : (
        <div>
          {cart.map(product => (
            <div key={product.id} className="cart-item">
              <img src={product.image} alt={product.name} />
              <div>
                <h3>{product.name}</h3>
                <p>Quantité: {product.quantity}</p>
                <p>Prix unitaire: {product.price}€</p>
                <p>Total par article: {(product.price * product.quantity).toFixed(2)}€</p>
              </div>
              <button onClick={() => handleRemove(product)}>Retirer</button>
            </div>
          ))}
          <div className="total-container">
            <span>Total:</span>
            <span>{total.toFixed(2)}€</span>
          </div>
          {user && (
            <button onClick={handleCheckout} className="checkout-btn">Passer la commande</button>
          )}
        </div>
      )}
    </div>
  )
}
