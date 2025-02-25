import React from 'react'
import { useDispatch } from 'react-redux'
import { addToCart, removeFromCart, decreaseQuantity } from '../../redux/cartSlice'
import './CartItem.css'

export default function CartItem ({ item }) {

  const dispatch = useDispatch()

  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} />
      <div className="cart-details">
        <h3>{item.name}</h3>
        <p>Prix: {item.price}€</p>
        <div className="cart-controls">
          <button onClick={() => dispatch(decreaseQuantity(item.id))}>-</button>
          <span>{item.quantity}</span>
          <button onClick={() => dispatch(addToCart(item))}>+</button>
          <button className="remove-btn" onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
        </div>
      </div>
    </div>
  )
}

