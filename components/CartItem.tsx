"use client"

import { Trash2 } from "lucide-react"

export default function CartItem({ item, onRemove }) {
  return (
    <div className="bg-white rounded-lg border border-border p-4 flex gap-4">
      <div className="w-24 h-24 bg-secondary rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden">
        <img
          src={item.image || "/placeholder.svg?height=100&width=100&query=product"}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1">
        <h3 className="font-bold text-foreground mb-1">{item.name}</h3>
        <p className="text-muted-foreground text-sm mb-2">Qty: {item.quantity}</p>
        <p className="font-semibold text-primary">${(item.price * item.quantity).toFixed(2)}</p>
      </div>

      <button
        onClick={() => onRemove(item.id)}
        className="p-2 hover:bg-secondary rounded-lg transition-colors text-destructive"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  )
}
