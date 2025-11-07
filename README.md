# E-commerce
# 🛍️ Vibe Commerce — Mock E-Commerce Cart

A simple **full-stack shopping cart application** built as part of the **Vibe Commerce full-stack screening assignment**.  
This project demonstrates the complete flow of an e-commerce cart — displaying products, managing cart state, performing a mock checkout (no real payment), and storing order details in MongoDB.

---

## 🚀 Tech Stack

| Layer | Technology |
|--------|-------------|
| **Frontend** | React (Create React App) + Tailwind CSS + Axios + React Router |
| **Backend** | Node.js + Express.js |
| **Database** | MongoDB + Mongoose |
| **API Type** | REST APIs |

---

## 📦 Features

✅ Product grid with **Add to Cart**  
✅ **Cart view** — update & remove items  
✅ **Dynamic total calculation**  
✅ **Mock checkout** — generates dummy receipt + fake payment details  
✅ **MongoDB persistence** for orders  
✅ Responsive **Tailwind UI**  
✅ **React Router** navigation: `Home`, `Products`, `Cart`, `My Orders`

---
## 🗂️ Project Structure




## ⚙️ Setup Instructions

### 🧩 Backend Setup


cd backend
npm install
node server.js

✅ Server runs at: http://localhost:5000

✅ MongoDB connects at: mongodb://127.0.0.1:27017/vibe_commerce


## ⚙️ Setup Instructions

### 🧩 Frontend Setup

cd frontend
npm install
npm start

✅ App runs at: http://localhost:3000

✅ API requests are automatically proxied to backend via "proxy": "http://localhost:5000" in package.json.

🔌 API Endpoints
Method	Endpoint	Description
GET	/api/products	Fetch mock product list
POST	/api/cart	Add item to cart (mock)
POST	/api/checkout	Process mock checkout & generate dummy receipt
GET	/api/orders	Fetch all past orders from MongoDB

### Example Checkout Response
{
    "receipt": {
        "id": "690e32878b889e19de1572b6",
        "name": "Chaya",
        "email": "chaya@example.com",
        "total": 70,
        "payment": {
            "txnId": "TXN17625381198185FDEAB",
            "method": "card",
            "last4": "4242",
            "status": "paid",
            "currency": "INR",
            "processedAt": "2025-11-07T17:55:19.822Z",
            "note": "This is a dummy payment. No real money was charged."
        },
        "timestamp": "2025-11-07T17:55:19.836Z"
    }
}
## 🗂️ Project Structure
E COM/
│
├── mock-ecom-cart/ # Backend
│ ├── server/
│ │ ├── models/
│ │ │ └── Cart.js
│ │ ├── node_modules/
│ │ ├── package.json
│ │ ├── package-lock.json
│ │ └── server.js
│ ├── .gitignore
│
└── vibe-frontend/ # Frontend
├── node_modules/
├── public/
├── src/
│ ├── components/
│ │ ├── CheckoutModal.js
│ │ ├── Home.js
│ │ ├── MyOrders.js
│ │ ├── Navbar.js
│ │ └── ProductGrid.js
│ ├── App.js
│ ├── App.css
│ ├── index.js
│ ├── index.css
│ ├── logo.svg
│ └── reportWebVitals.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
├── package-lock.json
└── README.md




