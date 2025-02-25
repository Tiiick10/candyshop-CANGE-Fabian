import React, { useState, useEffect } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './Carousel.css'

// Fonction pour mélanger un tableau (algorithme de Fisher-Yates)

function shuffleArray (array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    [array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

export default function Carousel () {

  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch('https://world.openfoodfacts.org/cgi/search.pl?search_terms=candy&json=true')
      .then((response) => response.json())
      .then((data) => {
        const productList = data.products
        
        const shuffledProducts = shuffleArray(productList)
        
        setProducts(shuffledProducts.slice(0, 4))
        setLoading(false)
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des produits:', error)
        setLoading(false)
      })
  }, [])

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  }

  return (
    <Slider {...settings}>
      {products.map((product) => (
        <div key={product.code} className="carousel-item">
          <img src={product.image_url || '/default-image.jpg'} alt={product.product_name_fr || product.product_name} />
          <p>{product.product_name_fr || product.product_name}</p>
        </div>
      ))}
    </Slider>
  )
}

