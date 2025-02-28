import React, { useState, useEffect } from 'react'
import ProductCard from '../components/ProductCard/ProductCard'
import Carousel from '../components/Carousel/Carousel'
import './Home.css'
import LoadingScreen from '../components/LoadingScreen/LoadingScreen'
import SearchBar from '../components/SearchBar/SearchBar'
import { LuCandy } from 'react-icons/lu'

export default function Home() {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetch('/data.json')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data)
        setFilteredProducts(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Erreur lors du chargement des produits:', error)
        setLoading(false)
      })
  }, [])

  const filterProducts = (searchTerm, category) => {
    let filtered = products

    if (category) {
      filtered = filtered.filter((product) => product.category === category)
    }

    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredProducts(filtered)
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
    filterProducts(event.target.value)
  }

  if (loading) {
    return <LoadingScreen />
  }

  return (
    <div className="home">
      <header className="home-header">
        <h1 className="welcome">
          Bienvenue chez Candy Shop <LuCandy />
        </h1>
        <Carousel />
      </header>

      <section className="product-section">
        <h2 className="product-title">Nos Produits</h2>

        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          filterProducts={filterProducts}
        />

        {filteredProducts.length === 0 && (
          <p className="no-results">Aucun produit trouvé, essayez un autre terme.</p>
        )}

        <div className="product-list-home">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  )
}
