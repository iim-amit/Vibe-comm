import express from "express"
import cors from "cors"
import sqlite3 from "sqlite3"
import path from "path"
import { fileURLToPath } from "url"

// Needed for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())


const dbPath = path.join(__dirname, "db", "ecommerce.db");

console.log("DB Path:", dbPath);

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) console.error("Database connection error:", err);
  else console.log("Connected to SQLite database");
});



// Initialize database schema
db.serialize(() => {
  // Products table
  db.run(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      description TEXT,
      image TEXT,
      stock INTEGER DEFAULT 100
    )
  `)

  // Users table (mock user for persistence)
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE,
      name TEXT
    )
  `)

  // Carts table
  db.run(`
    CREATE TABLE IF NOT EXISTS carts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER,
      productId INTEGER NOT NULL,
      quantity INTEGER NOT NULL,
      addedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users(id),
      FOREIGN KEY (productId) REFERENCES products(id)
    )
  `)

  // Orders table
  db.run(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER,
      email TEXT,
      name TEXT,
      total REAL NOT NULL,
      items TEXT NOT NULL,
      status TEXT DEFAULT 'completed',
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users(id)
    )
  `)

  // Seed products if empty
  db.get("SELECT COUNT(*) as count FROM products", (err, row) => {
    if (row.count === 0) {
      const products = [
        {
          name: "Premium Wireless Headphones",
          price: 149.99,
          description: "High-quality sound with noise cancellation",
          image: "/wireless-headphones.png",
        },
        {
          name: "Ultra HD Camera",
          price: 599.99,
          description: "4K video recording with AI enhancement",
          image: "/vintage-camera-still-life.png",
        },
        {
          name: "Smart Watch Pro",
          price: 299.99,
          description: "AMOLED display with health tracking",
          image: "/modern-smartwatch.png",
        },
        {
          name: "Portable Power Bank",
          price: 45.99,
          description: "30,000mAh with fast charging",
          image: "/portable-power-bank.png",
        },
        {
          name: "Gaming Keyboard', price: 129.99, description 'Mechanical switches with RGB lighting",
          image: "/gaming-keyboard.png",
        },
        {
          name: "USB-C Hub",
          price: 59.99,
          description: "7-in-1 connectivity solution",
          image: "/usb-hub.png",
        },
        {
          name: "Bluetooth Speaker",
          price: 89.99,
          description: "360° sound with 12-hour battery",
          image: "/bluetooth-speaker.jpg",
        },
        {
          name: "Phone Stand",
          price: 24.99,
          description: "Adjustable aluminum design",
          image: "/phone-stand.jpg",
        },
      ]

      products.forEach((product) => {
        db.run("INSERT INTO products (name, price, description, image) VALUES (?, ?, ?, ?)", [
          product.name,
          product.price,
          product.description,
          product.image,
        ])
      })
      console.log("Products seeded successfully")
    }
  })
})

// Helper function to ensure mock user exists
const ensureMockUser = (callback) => {
  db.get("SELECT id FROM users WHERE email = ?", ["demo@vibe.com"], (err, row) => {
    if (err) return callback(err)
    if (row) {
      callback(null, row.id)
    } else {
      db.run("INSERT INTO users (email, name) VALUES (?, ?)", ["demo@vibe.com", "Demo User"], function (err) {
        callback(err, this.lastID)
      })
    }
  })
}

// API Routes

// GET /api/products - Fetch all products
app.get("/api/products", (req, res) => {
  db.all("SELECT * FROM products", (err, rows) => {
    if (err) {
      return res.status(500).json({ error: "Failed to fetch products" })
    }
    res.json(rows)
  })
})

// POST /api/cart - Add item to cart
app.post("/api/cart", (req, res) => {
  const { productId, qty } = req.body

  if (!productId || !qty || qty < 1) {
    return res.status(400).json({ error: "Invalid product ID or quantity" })
  }

  ensureMockUser((err, userId) => {
    if (err) return res.status(500).json({ error: "Database error" })

    // Check if item already in cart
    db.get("SELECT id FROM carts WHERE userId = ? AND productId = ?", [userId, productId], (err, row) => {
      if (row) {
        // Update quantity
        db.run("UPDATE carts SET quantity = quantity + ? WHERE id = ?", [qty, row.id], (err) => {
          if (err) return res.status(500).json({ error: "Failed to update cart" })
          res.json({ success: true, message: "Cart updated" })
        })
      } else {
        // Insert new cart item
        db.run("INSERT INTO carts (userId, productId, quantity) VALUES (?, ?, ?)", [userId, productId, qty], (err) => {
          if (err) return res.status(500).json({ error: "Failed to add to cart" })
          res.json({ success: true, message: "Item added to cart" })
        })
      }
    })
  })
})

// GET /api/cart - Fetch cart items with total
app.get("/api/cart", (req, res) => {
  ensureMockUser((err, userId) => {
    if (err) return res.status(500).json({ error: "Database error" })

    db.all(
      `SELECT c.id, c.productId, c.quantity, p.name, p.price, p.image
       FROM carts c
       JOIN products p ON c.productId = p.id
       WHERE c.userId = ?`,
      [userId],
      (err, rows) => {
        if (err) return res.status(500).json({ error: "Failed to fetch cart" })

        const total = rows.reduce((sum, item) => sum + item.price * item.quantity, 0)
        res.json({ items: rows, total: Number.parseFloat(total.toFixed(2)) })
      },
    )
  })
})

// DELETE /api/cart/:id - Remove item from cart
app.delete("/api/cart/:id", (req, res) => {
  const { id } = req.params

  db.run("DELETE FROM carts WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: "Failed to remove item" })
    res.json({ success: true, message: "Item removed from cart" })
  })
})

// POST /api/checkout - Process mock checkout
app.post("/api/checkout", (req, res) => {
  const { cartItems, name, email } = req.body

  if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
    return res.status(400).json({ error: "Cart is empty" })
  }

  if (!name || !email) {
    return res.status(400).json({ error: "Name and email required" })
  }

  ensureMockUser((err, userId) => {
    if (err) return res.status(500).json({ error: "Database error" })

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const itemsJson = JSON.stringify(cartItems)

    db.run(
      "INSERT INTO orders (userId, email, name, total, items) VALUES (?, ?, ?, ?, ?)",
      [userId, email, name, total, itemsJson],
      function (err) {
        if (err) return res.status(500).json({ error: "Failed to process checkout" })

        // Clear cart
        db.run("DELETE FROM carts WHERE userId = ?", [userId], (err) => {
          if (err) console.error("Failed to clear cart:", err)

          res.json({
            success: true,
            receipt: {
              orderId: this.lastID,
              customerName: name,
              customerEmail: email,
              items: cartItems,
              total: Number.parseFloat(total.toFixed(2)),
              timestamp: new Date().toISOString(),
              status: "Order Confirmed",
            },
          })
        })
      },
    )
  })
})

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "Backend running" })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
