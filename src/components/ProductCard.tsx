"use client"
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import { useState } from 'react';
import { Check } from 'lucide-react';

type Product = {
  id: string;
  name: string;
  price: number;
  image_url: string;
  category: string;
};

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { showToast } = useToast();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({ ...product, quantity: 1 });
    showToast(`${product.name} added to cart!`, 'success');
    
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <Link href={`/products/${product.id}`} style={{
      backgroundColor: 'var(--surface-container-low)',
      borderRadius: '0.5rem',
      padding: '1.5rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      boxShadow: '0 4px 6px rgba(27, 28, 25, 0.02)',
      transition: 'transform 0.2s ease',
      cursor: 'pointer'
    }} className="product-card-hover">
      <div style={{
        aspectRatio: '1',
        backgroundColor: 'var(--surface-container-highest)',
        borderRadius: '0.5rem',
        overflow: 'hidden',
        position: 'relative'
      }}>
        {product.image_url ? (
          <img src={product.image_url} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
           <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--on-surface-variant)' }}>
             Product Image
           </div>
        )}
      </div>

      <div>
        <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--secondary)' }}>
          {product.category || 'Natural'}
        </span>
        <h3 style={{ fontSize: '1.25rem', marginTop: '0.25rem' }}>{product.name}</h3>
        <p style={{ fontSize: '1.25rem', fontFamily: 'var(--font-noto-serif)', color: 'var(--primary)', marginTop: '0.5rem' }}>
          ₹{product.price}
        </p>
      </div>

      <button onClick={handleAddToCart} className={isAdded ? "btn-primary" : "btn-secondary"} style={{ marginTop: 'auto', width: '100%', transition: 'all 0.3s ease', display: 'flex', justifyContent: 'center', gap: '0.5rem', backgroundColor: isAdded ? 'var(--secondary)' : '', border: isAdded ? 'none' : '' }} disabled={isAdded}>
        {isAdded ? (
          <>
            <Check size={18} /> Added
          </>
        ) : (
          'Add to Cart'
        )}
      </button>

      <style jsx>{`
        .product-card-hover:hover {
          transform: translateY(-4px);
        }
      `}</style>
    </Link>
  );
}
