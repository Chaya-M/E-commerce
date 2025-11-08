import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ProductGrid({ addToCart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/products').then(res => setProducts(res.data));
  }, []);

  return (
    <div className="grid">
      {products.map(p => (
        <div key={p.id} className="card">
          <h3>{p.name}</h3>
          <p>${p.price}</p>
          <button onClick={() => addToCart(p.id)}>Add to cart</button>
        </div>
      ))}
    </div>
  );
}
