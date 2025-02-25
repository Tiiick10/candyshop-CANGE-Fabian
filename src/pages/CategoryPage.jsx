import React from 'react'
import { useParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard/ProductCard'
import './CategoryPage.css'

const allProducts = [
  { id: 1, name: "Coca-Cola", category: "boissons", price: 1.5, image: "/images/coca.jpg" },
  { id: 2, name: "Chips BBQ", category: "snacks", price: 2.0, image: "/images/chips-bbq.jpg" },
  { id: 3, name: "Jus d'Orange", category: "boissons", price: 1.8, image: "/images/jus.jpg" },
  { id: 4, name: "Bonbons Fraise", category: "confiseries", price: 3.0, image: "/images/bonbons.jpg" }
]

const CategoryPage = () => {
  const { category } = useParams()
  const filteredProducts = allProducts.filter(product => product.category === category)

  return (
    <div className="category">
      <h2>Produits - {category}</h2>
      <div className="product-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => <ProductCard key={product.id} product={product} />)
        ) : (
          <p>Aucun produit trouvé.</p>
        )}
      </div>
    </div>
  )
}

export default CategoryPage
