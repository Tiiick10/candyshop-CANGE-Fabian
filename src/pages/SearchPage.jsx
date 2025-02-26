import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import ProductCard from '../components/ProductCard/ProductCard'
import './SearchPage.css'

const SearchPage = () => {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const location = useLocation()
  
  // Récupère les paramètres de l'URL (query et category)
  const queryParams = new URLSearchParams(location.search)
  const query = queryParams.get('query') || ''
  const category = queryParams.get('category') || ''

  useEffect(() => {
    fetch('/data.json')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data)
      })
      .catch((error) => console.error('Erreur lors du chargement des produits:', error))
  }, [])

  useEffect(() => {
    let filtered = products

    // Filtrage par catégorie
    if (category) {
      filtered = filtered.filter((product) => product.category === category)
    }

    // Filtrage par nom (si un terme de recherche est fourni)
    if (query) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      )
    }

    setFilteredProducts(filtered)
  }, [products, query, category]) // Re-filtrer lorsque les produits, la recherche ou la catégorie changent

  return (
    <div className="search-page">
      <h2>Résultats de la recherche</h2>
      <div className="product-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)
        ) : (
          <p>Aucun produit trouvé.</p>
        )}
      </div>
    </div>
  )
}

export default SearchPage
