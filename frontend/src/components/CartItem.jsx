"use client"

import React, { useState, useEffect } from "react";
import "../styles/CartItem.css"

function CartItem({ item, onRemove }) {
  const itemTotal = (item.price * item.quantity).toFixed(2)

  return (
    <div className="cart-item">
      <img
        src={item.image || "/placeholder.svg?height=80&width=80&query=product"}
        alt={item.name}
        className="item-image"
      />
      <div className="item-details">
        <h4>{item.name}</h4>
        <p className="item-price">${item.price.toFixed(2)} each</p>
        <p className="item-qty">Qty: {item.quantity}</p>
      </div>
      <div className="item-total">
        <p>${itemTotal}</p>
      </div>
      <button className="remove-btn" onClick={() => onRemove(item.id)} title="Remove item">
        ✕
      </button>
    </div>
  )
}

export default CartItem
