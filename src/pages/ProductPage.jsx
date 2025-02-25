import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart } from '../redux/cartSlice'
import './ProductPage.css'
import LoadingScreen from '../components/LoadingScreen/LoadingScreen'

export default function ProductPage() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/data.json')
      .then(response => response.json())
      .then(data => {

        // Trouver le produit en comparant l'ID du produit avec l'ID dans l'URL

        const foundProduct = data.find(prod => prod.id === parseInt(id)) // convertit l'ID en entier
        setProduct(foundProduct)
        setLoading(false)
      })
      .catch(error => {
        console.error('Erreur lors du chargement du produit:', error)
        setLoading(false)
      })
  }, [id])

  if (loading) {
    return <LoadingScreen />
  }

  if (!product) {
    return <p>Produit introuvable</p>
  }

  return (
    <div className="productPage-container">
      <div className="productPage-card">
        <img src={product.image} alt={product.name} />
        <h2>{product.name}</h2>
        <p>Prix: {product.price}€</p>
        <p>Catégorie: {product.category}</p>
        <button onClick={() => dispatch(addToCart(product))} className="add-to-cart-btn">
          Ajouter au panier
        </button>
      </div>
    </div>
  )
}
