"use client"

import React, { useState, useEffect } from "react";
import "../styles/ProductCard.css"

function ProductCard({ product, onAddToCart, apiBase }) {
  const [quantity, setQuantity] = useState(1)
  const [adding, setAdding] = useState(false)
  const [feedback, setFeedback] = useState("")

  const handleAddToCart = async () => {
    if (quantity < 1) return

    setAdding(true)
    try {
      const res = await fetch(`${apiBase}/cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.id, qty: quantity }),
      })

      if (!res.ok) throw new Error("Failed to add to cart")

      setFeedback("Added to cart!")
      setQuantity(1)
      onAddToCart()

      setTimeout(() => setFeedback(""), 2000)
    } catch (error) {
      setFeedback("Error adding to cart")
      console.error(error)
    } finally {
      setAdding(false)
    }
  }

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image || "/placeholder.svg?height=200&width=200&query=product"} alt={product.name} />
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="description">{product.description}</p>
        <p className="price">${product.price.toFixed(2)}</p>

        <div className="product-actions">
          <div className="quantity-selector">
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} disabled={quantity <= 1}>
              -
            </button>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
              disabled={adding}
            />
            <button onClick={() => setQuantity(quantity + 1)} disabled={adding}>
              +
            </button>
          </div>

          <button className="add-to-cart-btn" onClick={handleAddToCart} disabled={adding}>
            {adding ? "Adding..." : "Add to Cart"}
          </button>
        </div>

        {feedback && <p className="feedback">{feedback}</p>}
      </div>
    </div>
  )
}

export default ProductCard
