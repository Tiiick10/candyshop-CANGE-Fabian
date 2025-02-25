import React, { useState, useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart } from '../redux/cartSlice'
import './ProductPage.css'
import LoadingScreen from '../components/LoadingScreen/LoadingScreen'

export default function ProductPage () {

  const { id } = useParams()
  const location = useLocation()  // useLocation pour récupérer le state
  const dispatch = useDispatch()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  const handleAddToCart = () => {
    dispatch(addToCart(product))
  }

  useEffect(() => {
    fetch(`https://world.openfoodfacts.org/api/v0/product/${id}.json`)
      .then(response => response.json())
      .then(data => {
        const fetchedProduct = data.product
        const productWithPrice = {
          ...fetchedProduct,
          price: location.state?.price || 'Non disponible',  // Prend le prix du state généré dans Home
        }
        setProduct(productWithPrice)
        setLoading(false)
      })
      .catch(error => {
        console.error('Erreur lors de la récupération du produit:', error)
        setLoading(false)
      })
  }, [id, location.state])

  if (loading) {
    return <LoadingScreen />
  }

  if (!product) {
    return <p>Produit introuvable</p>
  }

  return (
    <div className="productPage-container">
      <div className="productPage-card">
        <img src={product.image_url} alt={product.name} />
        <h4>{product.name}</h4>
        <p>Prix: {product.price}€</p>
        <p>Catégorie: {product.categories_fr || 'Non précisé'}</p>
        <button onClick={handleAddToCart} className="add-to-cart-btn">
          Ajouter au panier
        </button>
      </div>
    </div>
  )
}
