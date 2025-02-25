import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  
  cart: JSON.parse(localStorage.getItem('cart')) || [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload
      const existingProduct = state.cart.find(p => p.id === product.id)

      if (existingProduct) {
        existingProduct.quantity += product.quantity
        existingProduct.totalPrice = (existingProduct.price * existingProduct.quantity).toFixed(2)
      } else {
        state.cart.push(product)
      }

      localStorage.setItem('cart', JSON.stringify(state.cart))
    },

    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(product => product.id !== action.payload.id)

      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    clearCart: (state) => {
      state.cart = []
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload
      const product = state.cart.find(product => product.id === id)
      if (product) {
        product.quantity = quantity
        product.totalPrice = (product.price * quantity).toFixed(2)
      }

      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
  },
})

export const { addToCart, removeFromCart, clearCart, updateQuantity } = cartSlice.actions
export default cartSlice.reducer
