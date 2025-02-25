import React from 'react'
import './LoadingScreen.css'

export default function LoadingScreen() {
  return (
    <div className="loading-screen">
      <div className="loading-spinner">
        <div className="spinner"></div>
      </div>
      <div className="loading-text">Chargement...</div>
    </div>
  )
}
