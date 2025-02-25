import React, { useState, useEffect } from 'react'
import './Carousel.css'

function shuffleArray(array) {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export default function Carousel() {
  const [products, setProducts] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    fetch('/data.json')
      .then((response) => response.json())
      .then((data) => {
        const shuffledProducts = shuffleArray(data)
        setProducts(shuffledProducts.slice(0, 10))
      })
      .catch((error) => console.error('Erreur de chargement du JSON:', error))
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [products])

  return (
    <div className="carousel">
      {products.length > 0 && (
        <div className="carousel-item">
          <img src={products[currentIndex].image} alt={products[currentIndex].nom} />
          <p>{products[currentIndex].nom}</p>
        </div>
      )}
    </div>
  )
}
