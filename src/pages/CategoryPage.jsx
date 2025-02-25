import React from 'react'
import { useParams, Link } from 'react-router-dom'
import './CategoryPage.css'

const allProducts = [
  { id: 1, name: "Coca-Cola", category: "boissons", image: "/images/coca.jpg" },
  { id: 2, name: "Chips BBQ", category: "snacks", image: "/images/chips-bbq.jpg" },
  { id: 3, name: "Jus d'Orange", category: "boissons", image: "/images/jus.jpg" },
  { id: 4, name: "Bonbons Fraise", category: "confiseries", image: "/images/bonbons.jpg" }
]

export default function CategoryPage () {
  const { category } = useParams()
  const filteredProducts = allProducts.filter(product => product.category === category)

  return (
    <div className="category">
      <h2>Produits - {category}</h2>
      <div className="product-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <Link to={`/product/${product.id}`} key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <p>{product.name}</p>
            </Link>
          ))
        ) : (
          <p>Aucun produit trouvé.</p>
        )}
      </div>
    </div>
  )
}

