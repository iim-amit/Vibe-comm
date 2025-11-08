"use client"


import React, { useState, useEffect } from "react";
import CartItem from "./CartItem"
import CheckoutForm from "./CheckoutForm"
import ReceiptModal from "./ReceiptModal"
import "../styles/Cart.css"

function Cart({ apiBase, onCheckout, onCartUpdate }) {
  const [cartItems, setCartItems] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showCheckout, setShowCheckout] = useState(false)
  const [receipt, setReceipt] = useState(null)

  const fetchCart = async () => {
    try {
      setLoading(true)
      const res = await fetch(`${apiBase}/cart`)
      if (!res.ok) throw new Error("Failed to fetch cart")
      const data = await res.json()
      setCartItems(data.items || [])
      setTotal(data.total || 0)
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCart()
  }, [apiBase])

  const handleRemoveItem = async (cartId) => {
    try {
      const res = await fetch(`${apiBase}/cart/${cartId}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Failed to remove item")
      await fetchCart()
      onCartUpdate()
    } catch (error) {
      console.error("Failed to remove item:", error)
      setError("Failed to remove item")
    }
  }

  const handleCheckout = async (customerData) => {
    try {
      const res = await fetch(`${apiBase}/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cartItems,
          ...customerData,
        }),
      })

      if (!res.ok) throw new Error("Failed to process checkout")
      const data = await res.json()

      setReceipt(data.receipt)
      setShowCheckout(false)
      await fetchCart()
      onCartUpdate()
    } catch (error) {
      console.error("Checkout error:", error)
      setError("Checkout failed. Please try again.")
    }
  }

  if (receipt) {
    return (
      <ReceiptModal
        receipt={receipt}
        onClose={() => {
          setReceipt(null)
          onCheckout()
        }}
      />
    )
  }

  if (showCheckout) {
    return (
      <CheckoutForm
        cartItems={cartItems}
        total={total}
        onSubmit={handleCheckout}
        onCancel={() => setShowCheckout(false)}
      />
    )
  }

  if (loading) return <div className="loading">Loading cart...</div>

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Your cart is empty</h2>
        <p>Start shopping to add items to your cart!</p>
      </div>
    )
  }

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>

      {error && <div className="error-message">{error}</div>}

      <div className="cart-content">
        <div className="cart-items">
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} onRemove={handleRemoveItem} />
          ))}
        </div>

        <div className="cart-summary">
          <h3>Order Summary</h3>
          <div className="summary-row">
            <span>Subtotal:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping:</span>
            <span>Free</span>
          </div>
          <div className="summary-row total">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <button className="checkout-btn" onClick={() => setShowCheckout(true)}>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cart
