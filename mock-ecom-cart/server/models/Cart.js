const mongoose = require("mongoose");

// ✅ Cart Schema for MongoDB
const CartSchema = new mongoose.Schema({
  name: String,
  email: String,
  items: [
    {
      productId: Number,
      name: String,
      price: Number,
      qty: Number,
    },
  ],
  total: Number,
  payment: {
    txnId: String,
    method: String,
    cardLast4: String,
    status: String,
    amount: Number,
    currency: String,
    processedAt: Date,
    note: String,
  },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Cart", CartSchema);
