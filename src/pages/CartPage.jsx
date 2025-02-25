import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import CartItem from '../components/CartItem'
import { clearCart } from '../redux/cartSlice'
import './CartPage.css'

const CartPage = () => {
  const cart = useSelector(state => state.cart.items)
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const user = useSelector(state => state.auth.user)
  const dispatch = useDispatch()

  return (
    <div className="cart-page">
      <h2>Votre Panier</h2>
      {cart.length > 0 ? (
        <>
          {cart.map(item => <CartItem key={item.id} item={item} />)}
          <h3>Total: {total.toFixed(2)}€</h3>
          {user && <button className="checkout-btn" onClick={() => dispatch(clearCart())}>Passer la commande</button>}
        </>
      ) : (
        <p>Votre panier est vide.</p>
      )}
    </div>
  )
}

export default CartPage
