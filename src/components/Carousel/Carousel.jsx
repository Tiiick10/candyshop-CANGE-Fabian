import React, { useState, useEffect } from 'react'
import './Carousel.css'

// Fonction pour mélanger un tableau (Fisher-Yates)

function shuffleArray(array) {
  let shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export default function Carousel() {

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    fetch('https://world.openfoodfacts.org/cgi/search.pl?search_terms=candy&json=true')
      .then((response) => response.json())
      .then((data) => {
        if (!data.products || data.products.length === 0) {
          throw new Error('Aucun produit trouvé.')
        }
        const shuffledProducts = shuffleArray(data.products).slice(0, 10)
        setProducts(shuffledProducts)
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des produits:', error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [products])

  if (loading) {
    return <div className="carousel-loading">Chargement du carrousel...</div>
  }

  return (
    <div className="carousel">
      <button className="carousel-btn prev" onClick={() => setCurrentIndex((currentIndex - 1 + products.length) % products.length)}>
        ◀
      </button>
      <div className="carousel-container">
        {products.length > 0 && (
          <div className="carousel-item">
            <img src={products[currentIndex].image_url || '/default-image.jpg'} alt={products[currentIndex].product_name_fr || products[currentIndex].product_name} />
            <p>{products[currentIndex].product_name_fr || products[currentIndex].product_name}</p>
          </div>
        )}
      </div>
      <button className="carousel-btn next" onClick={() => setCurrentIndex((currentIndex + 1) % products.length)}>
        ▶
      </button>
    </div>
  )
}
