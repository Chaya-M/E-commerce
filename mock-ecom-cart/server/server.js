const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const Cart = require("./models/Cart"); // ✅ import placed correctly

// ✅ Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/vibe_commerce", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("MongoDB connection error:", err));

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Root route
app.get('/', (req, res) => {
  res.json({ ok: true, service: 'mock-ecom-cart API' });
});

// ✅ Mock products
const products = [
  { id: 1, name: 'Wireless Mouse', price: 20 },
  { id: 2, name: 'Keyboard', price: 30 },
  { id: 3, name: 'Headphones', price: 50 },
  { id: 4, name: 'Monitor', price: 150 },
  { id: 5, name: 'Laptop Stand', price: 25 }
];

// ✅ GET /api/products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// ✅ POST /api/cart
app.post('/api/cart', (req, res) => {
  res.json({ message: 'Item added to cart (mock)' });
});

// ✅ POST /api/checkout – Mock Payment + Save Receipt
const crypto = require("crypto");

app.post("/api/checkout", async (req, res) => {
  try {
    const { cartItems = [], name = "Guest", email = "", payment = {} } = req.body;

    // Calculate total dynamically
    const total = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);

    // --- 🔹 Simulate Payment (FAKE / DEMO) ---
    const txnId = "TXN" + Date.now().toString() + crypto.randomBytes(3).toString("hex").toUpperCase();
    const method = payment.method || "card";
    const last4 = payment.cardNumber
      ? payment.cardNumber.slice(-4)
      : String(Math.floor(1000 + Math.random() * 9000));

    const paymentInfo = {
      txnId,
      method,
      last4,
      status: "paid",
      currency: payment.currency || "INR",
      processedAt: new Date(),
      note: "This is a dummy payment. No real money was charged.",
    };

    // Save order + fake payment
    const newCart = await Cart.create({
      name,
      email,
      items: cartItems,
      total,
      payment: paymentInfo,
    });

    // Respond with dummy receipt
    res.json({
      receipt: {
        id: newCart._id,
        name,
        email,
        total,
        payment: paymentInfo,
        timestamp: newCart.timestamp || newCart.createdAt,
      },
    });
  } catch (err) {
    console.error("Checkout save error:", err);
    res.status(500).json({ error: "Failed to save checkout (mock payment)" });
  }
});


// ✅ Start server
const PORT = 5000;
// ✅ GET /api/orders – fetch all past checkouts
app.get("/api/orders", async (req, res) => {
  try {
    const orders = await Cart.find().sort({ timestamp: -1 });
    res.json(orders);
  } catch (err) {
    console.error("Fetch orders error:", err);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
