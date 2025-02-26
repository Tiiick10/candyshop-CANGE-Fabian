import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './SearchBar.css'

export default function SearchBar({ filterProducts }) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('')
  const [products, setProducts] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    fetch('/data.json')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data)
      })
      .catch((error) => console.error('Erreur lors du chargement des produits:', error))
  }, [])

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase()
    setQuery(searchTerm)
    filterProducts(searchTerm, category)
  }

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value
    setCategory(selectedCategory)
    filterProducts(query, selectedCategory)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    navigate(`/search?query=${query}&category=${category}`)
  }

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit}>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Rechercher un produit..."
            value={query}
            onChange={handleSearch}
          />
          <select onChange={handleCategoryChange} value={category}>
            <option value="">Toutes les catégories</option>
            {Array.from(new Set(products.map((p) => p.category))).map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </form>
    </div>
  )
}
