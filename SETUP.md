# Quick Start Guide

## Prerequisites
- Node.js 16+ installed
- npm or yarn package manager
- Terminal/Command Prompt access

## 60-Second Setup

### Terminal 1 - Start Backend
\`\`\`bash
cd backend
npm install
npm run dev
\`\`\`
Expected output: `Server running on http://localhost:5000`

### Terminal 2 - Start Frontend
\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`
Expected output: `➜ Local: http://localhost:5173/`

### Open Browser
Navigate to: http://localhost:5173

**That's it!** You should see the Vibe Commerce homepage.

## Testing the App

1. **View Products** - Products should load automatically on page load
2. **Add to Cart** - Click "Add to Cart" on any product
3. **View Cart** - Click "Cart" button in header
4. **Update Quantities** - Use +/- buttons in cart
5. **Checkout** - Enter name and email, click "Place Order"
6. **See Receipt** - Order confirmation appears in modal

## Common Issues

| Issue | Solution |
|-------|----------|
| Backend won't start | Check port 5000 is free, or use `PORT=5001 npm run dev` |
| Frontend won't connect to API | Ensure backend is running on port 5000 |
| Products page blank | Check browser console (F12) for errors |
| Add to cart doesn't work | Backend must be running |

## Project Tour

\`\`\`
├── Backend (Express + SQLite)
│   ├── server.js - All API routes and database logic
│   ├── db/ - SQLite database (auto-created)
│   └── 8 pre-seeded products
│
└── Frontend (React + Vite)
    ├── Shop page - Browse products
    ├── Cart page - View and manage items
    ├── Checkout - Form with validation
    └── Receipt - Mock order confirmation
\`\`\`

## Next Steps

1. Test all features (add items, checkout, etc.)
2. Record a 1-2 minute demo video
3. Create GitHub repo and push code
4. Include demo video link in README
5. Share GitHub link for screening

## File Locations

- **API Routes**: `backend/server.js` (lines 60-200)
- **Database**: `backend/db/ecommerce.db` (auto-created)
- **React Components**: `frontend/src/components/`
- **Styling**: `frontend/src/styles/`
- **Configuration**: `backend/package.json`, `frontend/package.json`

## Customization

- **Change Products**: Edit `backend/server.js` line ~50
- **Change Colors**: Edit `frontend/src/App.css` 
- **Change API Port**: Use `PORT=3000 npm run dev`
- **Change Product Price**: Restart backend after changing `server.js`

---

**Need help?** Check README.md for detailed documentation.
