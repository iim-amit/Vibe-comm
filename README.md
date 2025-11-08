# Vibe Commerce - E-Commerce Cart Demo

A full-stack e-commerce shopping cart application built to demonstrate modern web development practices. Built with React frontend, Express backend, and SQLite database.

## Features

✅ **Product Catalog** - Display 8 mock tech products with descriptions and pricing
✅ **Shopping Cart** - Add/remove items with real-time quantity updates
✅ **Cart Persistence** - Persists cart data in SQLite database with mock user
✅ **Checkout Flow** - Form validation, customer info collection
✅ **Order Receipt** - Mock receipt modal with order confirmation
✅ **Responsive Design** - Mobile-friendly UI built with modern CSS
✅ **Error Handling** - Comprehensive error messages and validation
✅ **REST APIs** - 5 well-designed endpoints for cart operations

## Tech Stack

### Backend
- **Node.js** with Express.js
- **SQLite3** for persistent data storage
- **CORS** enabled for frontend communication
- **Port:** 5000 (configurable via PORT env var)

### Frontend
- **React 18** with hooks
- **Vite** for build tooling
- **Vanilla CSS** with responsive grid layouts
- **Port:** 5173 (default Vite dev server)

## Project Structure

\`\`\`
vibe-commerce/
├── backend/
│   ├── server.js           # Express server & API routes
│   ├── package.json        # Backend dependencies
│   ├── db/
│   │   └── ecommerce.db   # SQLite database (auto-created)
│   └── node_modules/
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx                           # Main app component
│   │   ├── main.jsx                          # React entry point
│   │   ├── App.css                           # Main styles
│   │   ├── components/
│   │   │   ├── ProductGrid.jsx               # Product listing
│   │   │   ├── ProductCard.jsx               # Individual product card
│   │   │   ├── Cart.jsx                      # Cart view component
│   │   │   ├── CartItem.jsx                  # Cart item component
│   │   │   ├── CheckoutForm.jsx              # Checkout form
│   │   │   └── ReceiptModal.jsx              # Order receipt modal
│   │   └── styles/
│   │       ├── ProductGrid.css
│   │       ├── ProductCard.css
│   │       ├── Cart.css
│   │       ├── CartItem.css
│   │       ├── CheckoutForm.css
│   │       └── ReceiptModal.css
│   ├── index.html          # HTML entry point
│   ├── package.json        # Frontend dependencies
│   └── node_modules/
│
└── README.md               # This file
\`\`\`

## Setup Instructions

### Prerequisites
- Node.js v16+ and npm
- Git (for version control)

### Backend Setup

1. Navigate to backend directory:
\`\`\`bash
cd backend
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

The backend will run on `http://localhost:5000`

To verify it's working, visit: `http://localhost:5000/health`

### Frontend Setup

1. In a new terminal, navigate to frontend directory:
\`\`\`bash
cd frontend
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

The frontend will run on `http://localhost:5173`

### Accessing the App

Open your browser and navigate to: `http://localhost:5173`

You should see the Vibe Commerce homepage with the product grid.

## API Documentation

### GET /api/products
Fetches all available products.

**Response:**
\`\`\`json
[
  {
    "id": 1,
    "name": "Premium Wireless Headphones",
    "price": 149.99,
    "description": "High-quality sound with noise cancellation",
    "image": "/placeholder.svg?key=e2rpg",
    "stock": 100
  }
]
\`\`\`

### POST /api/cart
Add an item to the cart.

**Request Body:**
\`\`\`json
{
  "productId": 1,
  "qty": 2
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "message": "Item added to cart"
}
\`\`\`

### GET /api/cart
Fetch cart items and total.

**Response:**
\`\`\`json
{
  "items": [
    {
      "id": 1,
      "productId": 1,
      "quantity": 2,
      "name": "Premium Wireless Headphones",
      "price": 149.99,
      "image": "/placeholder.svg?key=e2rpg"
    }
  ],
  "total": 299.98
}
\`\`\`

### DELETE /api/cart/:id
Remove an item from the cart.

**Response:**
\`\`\`json
{
  "success": true,
  "message": "Item removed from cart"
}
\`\`\`

### POST /api/checkout
Process checkout and create an order.

**Request Body:**
\`\`\`json
{
  "cartItems": [
    {
      "id": 1,
      "productId": 1,
      "quantity": 2,
      "name": "Premium Wireless Headphones",
      "price": 149.99
    }
  ],
  "name": "John Doe",
  "email": "john@example.com"
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "receipt": {
    "orderId": 1,
    "customerName": "John Doe",
    "customerEmail": "john@example.com",
    "items": [...],
    "total": 299.98,
    "timestamp": "2025-01-15T10:30:00.000Z",
    "status": "Order Confirmed"
  }
}
\`\`\`

## Features Explained

### 1. Product Grid
The shop displays 8 pre-seeded tech products with:
- Product image
- Name and description
- Price
- Quantity selector
- Add to Cart button with real-time feedback

### 2. Shopping Cart
The cart view shows:
- All added items with images and details
- Individual item quantities
- Item-level totals
- Order summary with subtotal and total
- Remove button for each item

### 3. Cart Persistence
- Mock user automatically created in database
- All cart operations tied to this user
- Cart data persists across page refreshes

### 4. Checkout Process
- Form collects customer name and email
- Real-time form validation
- Shows order review before submission
- Validates email format

### 5. Order Receipt
- Modal displays mock order confirmation
- Shows order ID and timestamp
- Lists all ordered items with quantities
- Confirms email delivery
- "Continue Shopping" button returns to shop

### 6. Responsive Design
- Mobile-first approach
- Works seamlessly on phones, tablets, and desktops
- Touch-friendly buttons and inputs
- Flexible grid layouts

## Error Handling

The app includes comprehensive error handling:
- Network error messages
- Form validation errors with inline feedback
- API error responses
- Graceful fallbacks for missing data
- Loading states during async operations

## Database Schema

The SQLite database includes 4 tables:

### Products Table
\`\`\`sql
CREATE TABLE products (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  price REAL NOT NULL,
  description TEXT,
  image TEXT,
  stock INTEGER
)
\`\`\`

### Users Table (Mock)
\`\`\`sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  email TEXT UNIQUE,
  name TEXT
)
\`\`\`

### Carts Table
\`\`\`sql
CREATE TABLE carts (
  id INTEGER PRIMARY KEY,
  userId INTEGER,
  productId INTEGER NOT NULL,
  quantity INTEGER NOT NULL,
  addedAt DATETIME,
  FOREIGN KEY (userId) REFERENCES users(id),
  FOREIGN KEY (productId) REFERENCES products(id)
)
\`\`\`

### Orders Table
\`\`\`sql
CREATE TABLE orders (
  id INTEGER PRIMARY KEY,
  userId INTEGER,
  email TEXT,
  name TEXT,
  total REAL NOT NULL,
  items TEXT,
  status TEXT,
  createdAt DATETIME,
  FOREIGN KEY (userId) REFERENCES users(id)
)
\`\`\`

## Development Workflow

### Adding a New Product
Edit `backend/server.js` in the database initialization section:

\`\`\`javascript
const products = [
  { name: 'Product Name', price: 99.99, description: '...', image: '...' },
  // Add new products here
];
\`\`\`

Restart the backend server - the database will auto-seed on startup.

### Customizing Styling
Each component has its own CSS file in `frontend/src/styles/`. Modify as needed.

### Environment Variables
Currently uses default ports. To customize:

**Backend:** Set `PORT` environment variable
\`\`\`bash
PORT=3000 npm run dev
\`\`\`

**Frontend:** Modify API_BASE in `src/App.jsx`
\`\`\`javascript
const API_BASE = 'http://localhost:3000/api';
\`\`\`

## Future Enhancements

Possible improvements for production:
- [ ] User authentication with JWT
- [ ] Real payment processing with Stripe
- [ ] Product filtering and search
- [ ] User accounts and order history
- [ ] Admin dashboard for inventory management
- [ ] Real product images from Fake Store API
- [ ] Email notifications
- [ ] Inventory tracking and stock alerts
- [ ] Unit and integration tests
- [ ] Deployment to production hosting

## Troubleshooting

### Port Already in Use
If port 5000 or 5173 is already in use:

**Backend:**
\`\`\`bash
PORT=5001 npm run dev
\`\`\`

Then update frontend API_BASE.

**Frontend:**
\`\`\`bash
npm run dev -- --port 5174
\`\`\`

### CORS Errors
Ensure backend is running and CORS is properly configured in `backend/server.js`.

### Database Errors
Delete `backend/db/ecommerce.db` to force a fresh database on next restart.

### Products Not Showing
Check browser console for errors. Verify backend is running with:
\`\`\`bash
curl http://localhost:5000/api/products
\`\`\`

## Demo Video

Record a 1-2 minute demo showing:
1. Product grid loading
2. Adding items to cart
3. Cart view with totals
4. Checkout form submission
5. Receipt modal confirmation

**Recording Tools:**
- Loom (Recommended - easiest)
- Screen recording on Mac/Windows
- OBS Studio (free alternative)

Upload to YouTube (unlisted) or Loom and include link in GitHub README.

## License

MIT License - Feel free to use for learning and projects.

## Contact

Built as a demo for Vibe Commerce screening.

---

**Live on GitHub:** https://github.com/yourusername/vibe-commerce
**Deployed Link** https://vibe-comm.vercel.app/
