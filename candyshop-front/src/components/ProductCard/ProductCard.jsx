import React from 'react'
import { Link } from 'react-router-dom'
import './ProductCard.css'

export default function ProductCard({ product, isCategoryPage = false }) {

    return (

      <div className={`product-card ${isCategoryPage ? 'category-style' : ''}`}>
          <img src={product.image} alt={product.name} />
          <h3>{product.name}</h3>
          <p>Prix : {product.price}€</p>
          <Link to={`/product/${product.id}`} className="details-btn">Voir Détails</Link>
        </div>
      )
}
