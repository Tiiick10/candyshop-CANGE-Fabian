import React, { useState, useEffect } from 'react'
import ProductCard from '../components/ProductCard/ProductCard'
import Carousel from '../components/Carousel/Carousel'
import './Home.css'
import LoadingScreen from '../components/LoadingScreen/LoadingScreen'

function getRandomPrice () {

  return (Math.random() * 5).toFixed(2)
  
}

export default function Home () {

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://world.openfoodfacts.org/cgi/search.pl?search_terms=candy&json=true')
      .then(response => response.json())
      .then(data => {

        // Pour chaque produit, on ajoute un prix aléatoire

        const productsWithPrice = data.products.map(product => ({
          ...product,
          price: getRandomPrice(),  // Ajoute le prix aléatoire
        }))
        setProducts(productsWithPrice)
        setLoading(false)
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des produits:', error)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <LoadingScreen />
  }

  const handleProductClick = (productId, price) => {

    history.push(`/product/${productId}`, { price }) // Passer le prix dans le state
    
  }

  return (

    <div className="home">

      <h2>Bienvenue chez Candy Shop 🍬</h2>

      <Carousel />

      <h3>Nos Produits</h3>

      <div className="product-list-home">
        {products.map(product => (
          <ProductCard
            key={product.code}
            product={{
              id: product.code,
              name: product.product_name_fr || product.product_name,
              price: product.price, // Prix (généré aléatoirement)
              category: product.categories_fr || 'Non précisé',
              image: product.image_url || '/default-image.jpg',
              quantity: 1, // Quantité par défaut car non précisée dans l'API
            }}
            onClick={() => handleProductClick(product.code, product.price)} // Ajoute le prix au state avec l'id du produit
          />
        ))}
      </div>
    </div>
  )
}

