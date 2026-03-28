"use client"
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import { useState } from 'react';
import { Check } from 'lucide-react';

export default function AddToCartButton({ product }: { product: any }) {
  const { addItem } = useCart();
  const { showToast } = useToast();
  const [quantity, setQuantity] = useState(1);

  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    addItem({ ...product, quantity });
    showToast(`${product.name} added to cart!`, 'success');
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '1rem', 
        backgroundColor: 'var(--surface-container-low)', 
        padding: '0.5rem 1rem', 
        borderRadius: '0.5rem' 
      }}>
        <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '1.25rem' }}>-</button>
        <span style={{ fontWeight: 600, minWidth: '20px', textAlign: 'center' }}>{quantity}</span>
        <button onClick={() => setQuantity(quantity + 1)} style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '1.25rem' }}>+</button>
      </div>
      <button onClick={handleAdd} className="btn-primary" style={{ flex: 1, padding: '1rem', backgroundColor: isAdded ? 'var(--secondary)' : '', transition: 'all 0.3s ease' }} disabled={isAdded}>
        {isAdded ? (
          <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            <Check size={18} /> Added to Cart
          </span>
        ) : (
          'Add to Cart'
        )}
      </button>
    </div>
  );
}
