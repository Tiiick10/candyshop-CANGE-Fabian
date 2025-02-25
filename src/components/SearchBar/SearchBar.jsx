import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './SearchBar.css'

const allProducts = [
  { id: 1, name: "Coca-Cola", category: "boissons", image: "/images/coca.jpg" },
  { id: 2, name: "Chips BBQ", category: "snacks", image: "/images/chips-bbq.jpg" },
  { id: 3, name: "Jus d'Orange", category: "boissons", image: "/images/jus.jpg" },
  { id: 4, name: "Bonbons Fraise", category: "confiseries", image: "/images/bonbons.jpg" }
]

export default function SearchBar () {
  const [query, setQuery] = useState('')
  const [filteredProducts, setFilteredProducts] = useState([])

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase()
    setQuery(searchTerm)
    if (searchTerm.length > 0) {
      setFilteredProducts(allProducts.filter(product => 
        product.name.toLowerCase().includes(searchTerm)
      ))
    } else {
      setFilteredProducts([])
    }
  }

  return (
    <div className="search-bar">
      <input 
        type="text" 
        placeholder="Rechercher un produit..." 
        value={query} 
        onChange={handleSearch} 
      />
      {query && (
        <div className="search-results">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <Link to={`/product/${product.id}`} key={product.id} className="search-item">
                <img src={product.image} alt={product.name} />
                <p>{product.name}</p>
              </Link>
            ))
          ) : (
            <p>Aucun produit trouvé.</p>
          )}
        </div>
      )}
    </div>
  )
}
