"use client"
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import { useState } from 'react';
import { Check } from 'lucide-react';

export default function AddToCartButton({ product }: { product: any }) {
  const { items, addItem, updateQuantity } = useCart();
  const { showToast } = useToast();
  
  const cartItem = items.find(i => i.id === product.id);

  const handleAdd = () => {
    addItem({ ...product, quantity: 1 });
    showToast(`${product.name} added to cart!`, 'success');
  };

  const handleIncrement = () => {
    if (cartItem) updateQuantity(product.id, cartItem.quantity + 1);
  };

  const handleDecrement = () => {
    if (cartItem) updateQuantity(product.id, cartItem.quantity - 1);
  };

  if (cartItem) {
    return (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        backgroundColor: 'var(--primary)', 
        color: 'white', 
        borderRadius: 'var(--radius-full)', 
        padding: '0.375rem', 
        width: '100%', 
        maxWidth: '300px',
        height: '3.5rem',
        boxShadow: 'var(--shadow-md)'
      }}>
        <button onClick={handleDecrement} style={{ background: 'var(--primary-dark)', borderRadius: '50%', border: 'none', color: 'white', width: '2.75rem', height: '2.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '1.5rem' }}>-</button>
        <span style={{ fontWeight: 600, fontSize: '1rem' }}>{cartItem.quantity} in Cart</span>
        <button onClick={handleIncrement} style={{ background: 'var(--primary-dark)', borderRadius: '50%', border: 'none', color: 'white', width: '2.75rem', height: '2.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '1.5rem' }}>+</button>
      </div>
    );
  }

  return (
    <button onClick={handleAdd} className="btn-primary" style={{ width: '100%', maxWidth: '300px', padding: '1rem', height: '3.5rem' }}>
      Add to Cart
    </button>
  );
}
