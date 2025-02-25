import React, { useState, useEffect } from 'react'
import ProductCard from '../components/ProductCard/ProductCard'
import Carousel from '../components/Carousel/Carousel'
import './Home.css'
import LoadingScreen from '../components/LoadingScreen/LoadingScreen'

export default function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/data.json')
      .then(response => response.json())
      .then(data => {
        setProducts(data)
        setLoading(false)
      })
      .catch(error => {
        console.error('Erreur lors du chargement des produits:', error)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <LoadingScreen />
  }

  return (
    <div className="home">
      <h2>Bienvenue chez Candy Shop 🍬</h2>
      <Carousel />

      <h3>Nos Produits</h3>
      <div className="product-list-home">
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </div>
  )
}
