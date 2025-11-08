"use client"

import { Check } from "lucide-react"

export default function ReceiptModal({ receipt, onClose }) {
  const orderDate = new Date(receipt.timestamp).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className="p-6 text-center border-b border-border">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <Check className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-2">Order Confirmed!</h3>
          <p className="text-muted-foreground">Thank you for your purchase</p>
        </div>

        <div className="p-6 space-y-4">
          <div className="bg-secondary rounded-lg p-4">
            <div className="text-sm text-muted-foreground mb-1">Order Number</div>
            <div className="font-bold text-foreground">{receipt.orderId}</div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-secondary rounded-lg p-4">
              <div className="text-sm text-muted-foreground mb-1">Date</div>
              <div className="font-semibold text-foreground text-sm">{orderDate}</div>
            </div>
            <div className="bg-secondary rounded-lg p-4">
              <div className="text-sm text-muted-foreground mb-1">Total</div>
              <div className="font-bold text-primary text-lg">${receipt.total.toFixed(2)}</div>
            </div>
          </div>

          <div>
            <div className="text-sm text-muted-foreground mb-2">Shipped To</div>
            <div className="bg-secondary rounded-lg p-4">
              <div className="font-semibold text-foreground">{receipt.customerName}</div>
              <div className="text-sm text-muted-foreground">{receipt.customerEmail}</div>
            </div>
          </div>

          <div>
            <div className="text-sm text-muted-foreground mb-2">Items</div>
            <div className="space-y-2">
              {receipt.items?.map((item) => (
                <div key={item.id} className="flex justify-between text-sm text-foreground">
                  <span>{item.name}</span>
                  <span className="font-semibold">
                    {item.quantity}x ${item.price.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  )
}
