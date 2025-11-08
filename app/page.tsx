"use client"

import { useState, useEffect } from "react"
import Header from "@/components/Header"
import ProductGrid from "@/components/ProductGrid"
import Cart from "@/components/Cart"
import CheckoutModal from "@/components/CheckoutModal"
import ReceiptModal from "@/components/ReceiptModal"

export default function Home() {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])
  const [showCart, setShowCart] = useState(false)
  const [showCheckout, setShowCheckout] = useState(false)
  const [showReceipt, setShowReceipt] = useState(false)
  const [receipt, setReceipt] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
    fetchCart()
  }, [])

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products")
      const data = await res.json()
      setProducts(data)
    } catch (error) {
      console.error("[v0] Error fetching products:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchCart = async () => {
    try {
      const res = await fetch("/api/cart")
      const data = await res.json()
      setCart(data.items || [])
    } catch (error) {
      console.error("[v0] Error fetching cart:", error)
    }
  }

  const handleAddToCart = async (productId, quantity) => {
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity }),
      })
      const updatedCart = await res.json()
      setCart(updatedCart.items || [])
    } catch (error) {
      console.error("[v0] Error adding to cart:", error)
    }
  }

  const handleRemoveFromCart = async (cartItemId) => {
    try {
      const res = await fetch(`/api/cart/${cartItemId}`, {
        method: "DELETE",
      })
      const updatedCart = await res.json()
      setCart(updatedCart.items || [])
    } catch (error) {
      console.error("[v0] Error removing from cart:", error)
    }
  }

  const handleCheckout = async (customerData) => {
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: customerData.name,
          customerEmail: customerData.email,
          cartItems: cart,
        }),
      })
      const receiptData = await res.json()
      setReceipt(receiptData)
      setShowCheckout(false)
      setShowReceipt(true)
      setCart([])
    } catch (error) {
      console.error("[v0] Error during checkout:", error)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header cartCount={cart.length} onCartClick={() => setShowCart(!showCart)} />

      {showCart ? (
        <Cart
          items={cart}
          onRemove={handleRemoveFromCart}
          onCheckout={() => {
            setShowCart(false)
            setShowCheckout(true)
          }}
        />
      ) : (
        <ProductGrid products={products} loading={loading} onAddToCart={handleAddToCart} />
      )}

      {showCheckout && (
        <CheckoutModal
          total={cart.reduce((sum, item) => sum + item.price * item.quantity, 0)}
          onClose={() => setShowCheckout(false)}
          onSubmit={handleCheckout}
        />
      )}

      {showReceipt && receipt && (
        <ReceiptModal
          receipt={receipt}
          onClose={() => {
            setShowReceipt(false)
            setShowCart(false)
          }}
        />
      )}
    </div>
  )
}
