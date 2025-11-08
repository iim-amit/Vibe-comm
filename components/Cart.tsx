"use client"

import CartItem from "./CartItem"

export default function Cart({ items, onRemove, onCheckout }) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-foreground mb-8">Shopping Cart</h2>

      {items.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg mb-4">Your cart is empty</p>
          <p className="text-muted-foreground">Add items to get started</p>
        </div>
      ) : (
        <>
          <div className="space-y-4 mb-8">
            {items.map((item) => (
              <CartItem key={item.id} item={item} onRemove={onRemove} />
            ))}
          </div>

          <div className="bg-secondary rounded-lg p-6 mb-6">
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-border">
              <span className="text-muted-foreground">Subtotal:</span>
              <span className="font-semibold">${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-border">
              <span className="text-muted-foreground">Shipping:</span>
              <span className="font-semibold">Free</span>
            </div>
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Total:</span>
              <span className="text-primary text-2xl">${total.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={onCheckout}
            className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-bold text-lg hover:bg-primary/90 transition-colors"
          >
            Proceed to Checkout
          </button>
        </>
      )}
    </main>
  )
}
