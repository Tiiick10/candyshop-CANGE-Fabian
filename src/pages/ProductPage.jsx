import React from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart } from '../redux/cartSlice'
import './ProductPage.css'

const allProducts = [
  { id: 1, name: "Coca-Cola", description: "Boisson rafraîchissante", price: 1.5, image: "/images/coca.jpg" },
  { id: 2, name: "Chips BBQ", description: "Chips goût BBQ croustillantes", price: 2.0, image: "/images/chips-bbq.jpg" }
]

const ProductPage = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const product = allProducts.find(p => p.id === parseInt(id))

  if (!product) return <p>Produit introuvable</p>

  return (
    <div className="product">
      <img src={product.image} alt={product.name} />
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Prix: {product.price}€</p>
      <button onClick={() => dispatch(addToCart(product))}>Ajouter au panier</button>
    </div>
  )
}

export default ProductPage
