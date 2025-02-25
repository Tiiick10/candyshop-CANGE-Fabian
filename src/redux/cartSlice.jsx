import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cart: [],
}

const cartSlice = createSlice({
  
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload

      const existingProduct = state.cart.find(item => item.id === product.id)
      
      if (existingProduct) {
        
        existingProduct.quantity += 1

      } else {
        
        state.cart.push({ ...product, quantity: 1 })
      }
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(item => item.id !== action.payload.id)
    },
    clearCart: (state) => {
      state.cart = []
    },
  },
})

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions

export default cartSlice.reducer
