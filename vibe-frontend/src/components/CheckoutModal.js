import React, { useState } from 'react';
import axios from 'axios';

export default function CheckoutModal({ cartItems, products, close }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [receipt, setReceipt] = useState(null);

  const handleCheckout = () => {
    axios.post('http://localhost:5000/api/checkout', { cartItems, name, email })
      .then(res => setReceipt(res.data.receipt));
  }

  if (receipt) return (
    <div>
      <h2>Receipt</h2>
      <p>Name: {receipt.name}</p>
      <p>Email: {receipt.email}</p>
      <p>Total: ${receipt.total}</p>
      <p>Time: {new Date(receipt.timestamp).toLocaleString()}</p>
      <button onClick={close}>Close</button>
    </div>
  )

  return (
    <div>
      <h2>Checkout</h2>
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <button onClick={handleCheckout}>Submit</button>
    </div>
  )
}
