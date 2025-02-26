import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard/ProductCard'
import './CategoryPage.css'

export default function CategoryPage() {
  const { categoryName } = useParams()
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch('/data.json')
      .then(response => response.json())
      .then(data => {
        const filteredProducts = data.filter(product => product.category === categoryName)
        setProducts(filteredProducts)
      })
      .catch(error => console.error('Erreur de chargement des produits:', error))
  }, [categoryName])

  return (
    <div className="category-page">
      <h2>Produits dans la catégorie: {categoryName}</h2>
      <div className="product-list">
        {products.length > 0 ? (
          products.map(product => (
            <ProductCard key={product.id} product={product} isCategoryPage={true} />
          ))
        ) : (
          <p>Aucun produit trouvé dans cette catégorie.</p>
        )}
      </div>
    </div>
  )
}
