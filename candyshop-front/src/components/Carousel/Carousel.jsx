import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Carousel.css'

function shuffleArray(array) {
  const shuffled = [...array]
  for (let i = shuffled.length - 1 ; i > 0 ; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export default function Carousel() {
  const [products, setProducts] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    const savedProducts = localStorage.getItem('carouselProducts')

    if (savedProducts) {
      setProducts(JSON.parse(savedProducts))
    } else {
      fetch('/data.json')
        .then((response) => response.json())
        .then((data) => {
          const shuffledProducts = shuffleArray(data).slice(0, 4)
          setProducts(shuffledProducts)
          localStorage.setItem('carouselProducts', JSON.stringify(shuffledProducts))
        })
        .catch((error) => console.error('Erreur de chargement du JSON:', error))
    }
  }, [])

  useEffect(() => {
    if (products.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length)
      }, 5000)

      return () => clearInterval(interval)
    }
  }, [products])

  const handleClick = () => {
    if (products.length > 0) {
      navigate(`/product/${products[currentIndex].id}`)
    }
  }

  return (
    <div className="carousel">
      {products.length > 0 && (
        <div className="carousel-item" onClick={handleClick} style={{ cursor: 'pointer' }}>
          <img src={products[currentIndex].image} alt={products[currentIndex].nom} />
          <p>{products[currentIndex].nom}</p>
        </div>
      )}
    </div>
  )
}
