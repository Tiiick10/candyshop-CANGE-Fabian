import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeFromCart, clearCart } from '../redux/cartSlice'
import './CartPage.css'

export default function CartPage () {
  const cartItems = useSelector(state => state.cart.cartItems)
  const dispatch = useDispatch()

  return (
    <div className="cart">
      <h2>Votre Panier</h2>
      {cartItems.length === 0 ? <p>Votre panier est vide.</p> : (
        <>
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <p>{item.name} (x{item.quantity})</p>
              <button onClick={() => dispatch(removeFromCart(item.id))}>Retirer</button>
            </div>
          ))}
          <button onClick={() => dispatch(clearCart())}>Vider le panier</button>
        </>
      )}
    </div>
  )
}

