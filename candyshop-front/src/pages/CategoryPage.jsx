import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard/ProductCard'
import './CategoryPage.css'

export default function CategoryPage() {
  const { categoryName } = useParams()
  const [products, setProducts] = useState([])
  const [categoryLabel, setCategoryLabel] = useState('')

  useEffect(() => {
    fetch('/data.json')
      .then(response => response.json())
      .then(data => {

        // Filtrer les produits par category_id qui correspond à categoryName dans l'URL

        const filteredProducts = data.filter(product => product.category_id === categoryName)
        setProducts(filteredProducts)

        // Trouver le nom de la catégorie en français pour l'afficher

        const category = data.find(product => product.category_id === categoryName)
        if (category) {
          setCategoryLabel(category.category_name) // On récupère le nom en français
        }
      })
      .catch(error => console.error('Erreur de chargement des produits:', error))
  }, [categoryName]) // On refait le filtre chaque fois que categoryName change

  return (
    <div className="category-page">
      <h2 className='h2Label'>Produits dans la catégorie: {categoryLabel}</h2>
      <div className="product-list">
        {products.length > 0 ? (
          products.map(product => (
            <ProductCard key={product.id} product={product} isCategoryPage={true} />
          ))
        ) : (
          <p>Aucun produit trouvé dans cette catégorie.</p>
        )}
      </div>
    </div>
  )
}
