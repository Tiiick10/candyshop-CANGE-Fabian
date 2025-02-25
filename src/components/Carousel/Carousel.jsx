import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './Carousel.css'

const products = [
  { id: 1, name: "Bonbon Fraise", image: "/images/fraise.jpg" },
  { id: 2, name: "Chocolat", image: "/images/chocolat.jpg" },
  { id: 3, name: "Soda", image: "/images/soda.jpg" },
  { id: 4, name: "Chips", image: "/images/chips.jpg" }
]

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1
  }

  return (
    <Slider {...settings}>
      {products.map((product) => (
        <div key={product.id} className="carousel-item">
          <img src={product.image} alt={product.name} />
          <p>{product.name}</p>
        </div>
      ))}
    </Slider>
  )
}

export default Carousel
