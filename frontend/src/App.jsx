"use client"

import React from "react";
import { useState, useEffect } from "react"
import ProductGrid from "./components/ProductGrid"
import Cart from "./components/Cart"
import "./App.css"

function App() {
  const [currentView, setCurrentView] = useState("shop")
  const [cartCount, setCartCount] = useState(0)
  const API_BASE = "http://localhost:5000/api"

  const updateCartCount = async () => {
    try {
      const res = await fetch(`${API_BASE}/cart`)
      const data = await res.json()
      const count = data.items?.reduce((sum, item) => sum + item.quantity, 0) || 0
      setCartCount(count)
    } catch (error) {
      console.error("Failed to update cart count:", error)
    }
  }

  useEffect(() => {
    updateCartCount()
  }, [])

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-container">
          <div className="logo">
            <h1>Vibe Commerce</h1>
            <p className="tagline">Your Tech Marketplace</p>
          </div>
          <nav className="nav">
            <button
              className={`nav-btn ${currentView === "shop" ? "active" : ""}`}
              onClick={() => setCurrentView("shop")}
            >
              Shop
            </button>
            <button
              className={`nav-btn ${currentView === "cart" ? "active" : ""}`}
              onClick={() => {
                setCurrentView("cart")
                updateCartCount()
              }}
            >
              Cart ({cartCount})
            </button>
          </nav>
        </div>
      </header>

      <main className="app-content">
        {currentView === "shop" && <ProductGrid onAddToCart={updateCartCount} apiBase={API_BASE} />}
        {currentView === "cart" && (
          <Cart apiBase={API_BASE} onCheckout={() => setCurrentView("shop")} onCartUpdate={updateCartCount} />
        )}
      </main>

      <footer className="app-footer">
        <p>&copy; 2025 Vibe Commerce. Demo e-commerce app.</p>
      </footer>
    </div>
  )
}

export default App
