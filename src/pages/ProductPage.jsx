import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart } from '../redux/cartSlice'
import './ProductPage.css'
import LoadingScreen from '../components/LoadingScreen/LoadingScreen'

export default function ProductPage() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    fetch('/data.json')
      .then(response => response.json())
      .then(data => {
        const foundProduct = data.find(prod => prod.id === parseInt(id))
        setProduct(foundProduct)
        setLoading(false)
      })
      .catch(error => {
        console.error('Erreur lors du chargement du produit:', error)
        setLoading(false)
      })
  }, [id])

  const handleIncreaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1)
  }

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1)
    }
  }

  const handleAddToCart = () => {
    const productWithQuantity = { ...product, quantity, totalPrice: (product.price * quantity).toFixed(2) }
    dispatch(addToCart(productWithQuantity))
    setSuccessMessage("L'article a été ajouté avec succès !")

    setTimeout(() => {
      navigate('/')
    }, 2000)
  }

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

        {successMessage && <p className="success-message">{successMessage}</p>}

        <div className="quantity-control">
          <button onClick={handleDecreaseQuantity}>-</button>
          <input
            type="number"
            value={quantity}
            min="1"
            onChange={(e) => setQuantity(parseInt(e.target.value))}
          />
          <button onClick={handleIncreaseQuantity}>+</button>
        </div>

        <button onClick={handleAddToCart} className="add-to-cart-btn">
          Ajouter au panier
        </button>
      </div>
    </div>
  )
}
