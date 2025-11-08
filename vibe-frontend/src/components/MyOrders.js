import React, { useEffect, useState } from "react";
import axios from "axios";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/orders")
      .then(res => setOrders(res.data))
      .catch(err => console.error("Error fetching orders:", err));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">📜 My Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="border p-3 mb-3 rounded-lg bg-gray-50">
            <p><b>Name:</b> {order.name}</p>
            <p><b>Email:</b> {order.email}</p>
            <p><b>Total:</b> ₹{order.total}</p>
            <p><b>Txn ID:</b> {order.payment?.txnId || "N/A"}</p>
            <p><b>Status:</b> {order.payment?.status || "pending"}</p>
            <p className="text-sm text-gray-500">
              Ordered at: {new Date(order.timestamp).toLocaleString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
}
