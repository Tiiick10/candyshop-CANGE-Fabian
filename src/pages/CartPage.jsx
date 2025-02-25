import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeFromCart, clearCart } from '../redux/cartSlice'
import './CartPage.css'

export default function CartPage () {
  const cart = useSelector(state => state.cart.cart)
  const dispatch = useDispatch()

  const handleRemove = (product) => {
    dispatch(removeFromCart(product))
  }

  const handleCheckout = () => {
    dispatch(clearCart())
    alert('Commande passée avec succès !')
  }

  const total = cart.reduce((acc, product) => acc + product.price * product.quantity, 0)

  return (
    <div className="cart-page">
      <h2>Mon Panier</h2>
      {cart.length === 0 ? (
        <p>Le panier est vide.</p>
      ) : (
        <div>
          {cart.map(product => (
            <div key={product.id} className="cart-item">
              <img src={product.image} alt={product.nom} />
              <h3>{product.nom}</h3>
              <p>Prix: {product.price}€</p>
              <p>Quantité: {product.quantity}</p>
              <button onClick={() => handleRemove(product)}>Retirer du panier</button>
            </div>
          ))}
          <p>Total: {total.toFixed(2)}€</p>
          <button onClick={handleCheckout}>Passer la commande</button>
        </div>
      )}
    </div>
  )
}

