"use client"

import React, { useState, useEffect } from "react";
import "../styles/ReceiptModal.css"

function ReceiptModal({ receipt, onClose }) {
  const orderDate = new Date(receipt.timestamp).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <div className="receipt-modal-overlay">
      <div className="receipt-modal">
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>

        <div className="receipt-content">
          <h2 className="success-title">Order Confirmed!</h2>
          <p className="status">{receipt.status}</p>

          <div className="receipt-details">
            <div className="receipt-section">
              <h3>Order Information</h3>
              <p>
                <strong>Order ID:</strong> #{receipt.orderId}
              </p>
              <p>
                <strong>Date & Time:</strong> {orderDate}
              </p>
            </div>

            <div className="receipt-section">
              <h3>Customer Information</h3>
              <p>
                <strong>Name:</strong> {receipt.customerName}
              </p>
              <p>
                <strong>Email:</strong> {receipt.customerEmail}
              </p>
            </div>

            <div className="receipt-section">
              <h3>Order Items</h3>
              <div className="receipt-items">
                {receipt.items.map((item, index) => (
                  <div key={index} className="receipt-item">
                    <div>
                      <p className="item-name">{item.name}</p>
                      <p className="item-qty">Qty: {item.quantity}</p>
                    </div>
                    <div className="item-price">
                      <p>${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="receipt-section total-section">
              <div className="receipt-total">
                <strong>Total Amount:</strong>
                <strong className="total-price">${receipt.total.toFixed(2)}</strong>
              </div>
            </div>

            <p className="confirmation-text">
              A confirmation email has been sent to <strong>{receipt.customerEmail}</strong>
            </p>
          </div>

          <button className="continue-shopping-btn" onClick={onClose}>
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  )
}

export default ReceiptModal
