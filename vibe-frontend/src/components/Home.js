import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const [form, setForm] = useState({ name: "", email: "" });

  // ✅ Fetch products from backend
  useEffect(() => {
    axios
      .get("/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // ✅ Add item to cart
  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      setCart(
        cart.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i
        )
      );
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  // ✅ Remove item from cart
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // ✅ Calculate total
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  // ✅ Mock checkout with dummy payment
  const handleCheckout = () => {
    axios
      .post("/api/checkout", {
        cartItems: cart,
        name: form.name,
        email: form.email,
        payment: { method: "card", cardNumber: "4242424242424242" },
      })
      .then((res) => {
        setReceipt(res.data.receipt);
        setCart([]); // clear cart
      })
      .catch((err) => console.error("Checkout error:", err));
  };

  return (
    <div>
      <h1 className="text-2xl text-center font-bold text-indigo-700 mb-6">
        🛍️ Products
      </h1>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white shadow rounded-lg p-4 text-center border"
          >
            <h3 className="font-medium">{p.name}</h3>
            <p className="text-gray-600 mb-2">₹{p.price}</p>
            <button
              onClick={() => addToCart(p)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Cart Section */}
      <h2 className="text-xl font-semibold mt-10 mb-3">🛒 Your Cart</h2>
      {cart.length === 0 ? (
        <p className="text-gray-500">No items in cart</p>
      ) : (
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b py-2"
            >
              <span>
                {item.name} × {item.qty}
              </span>
              <div>
                ₹{item.price * item.qty}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="ml-3 bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-sm"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="flex justify-between items-center mt-4">
            <h3 className="font-semibold text-lg">Total: ₹{total}</h3>
            <button
              onClick={() => setShowCheckout(true)}
              className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-md"
            >
              Checkout
            </button>
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-80 shadow-lg">
            {receipt ? (
              <>
                <h3 className="text-xl font-bold mb-3">Payment Receipt</h3>
                <p>
                  <b>Name:</b> {form.name}
                </p>
                <p>
                  <b>Email:</b> {form.email}
                </p>
                <p>
                  <b>Total:</b> ₹{receipt.total}
                </p>
                <div className="mt-3 p-3 bg-gray-50 rounded">
                  <p>
                    <b>Transaction ID:</b> {receipt.payment.txnId}
                  </p>
                  <p>
                    <b>Method:</b> {receipt.payment.method}
                  </p>
                  <p>
                    <b>Status:</b> {receipt.payment.status}
                  </p>
                  <p>
                    <b>Note:</b> {receipt.payment.note}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowCheckout(false);
                    setReceipt(null);
                    setForm({ name: "", email: "" });
                  }}
                  className="mt-4 bg-indigo-600 text-white w-full py-2 rounded-md"
                >
                  Close
                </button>
              </>
            ) : (
              <>
                <h3 className="text-xl font-bold mb-3">Checkout</h3>
                <input
                  type="text"
                  placeholder="Name"
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  className="border border-gray-300 w-full mb-2 p-2 rounded"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                  className="border border-gray-300 w-full mb-3 p-2 rounded"
                />
                <button
                  onClick={handleCheckout}
                  className="bg-green-500 text-white w-full py-2 rounded-md mb-2"
                >
                  Submit
                </button>
                <button
                  onClick={() => setShowCheckout(false)}
                  className="bg-gray-400 text-white w-full py-2 rounded-md"
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
