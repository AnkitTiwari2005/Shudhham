"use client"
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal, totalItems } = useCart();

  if (items.length === 0) {
    return (
      <div className="section-padding" style={{ textAlign: 'center' }}>
        <div className="container">
          <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>🛒</div>
          <h1 className="heading-title" style={{ marginBottom: '1rem', fontSize: '2rem' }}>Your Cart is Empty</h1>
          <p style={{ color: 'var(--on-surface-variant)', maxWidth: '400px', margin: '0 auto 2.5rem auto', fontSize: '1.125rem' }}>
            Looks like you haven&apos;t added any natural remedies yet. Let&apos;s fix that!
          </p>
          <Link href="/products" className="btn-primary" style={{ maxWidth: '300px', margin: '0 auto' }}>Browse Products</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: 'var(--surface-container-low)', minHeight: '100vh' }}>
      <div className="page-padding">
        <div className="container">
          <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h1 className="heading-title" style={{ fontSize: '2rem' }}>Shopping Cart</h1>
            <p style={{ color: 'var(--on-surface-variant)', marginTop: '0.5rem', fontSize: '1rem' }}>{totalItems} item{totalItems > 1 ? 's' : ''}</p>
          </header>

          <div className="responsive-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '2rem', alignItems: 'start' }}>
            {/* Items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {items.map((item) => (
                <div key={item.id} style={{ 
                  display: 'flex', 
                  gap: '1rem', 
                  padding: '1.25rem', 
                  backgroundColor: 'var(--surface)', 
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: 'var(--shadow-sm)',
                  alignItems: 'center'
                }}>
                  <div style={{ width: '90px', height: '90px', borderRadius: 'var(--radius-md)', overflow: 'hidden', backgroundColor: 'var(--surface-container-highest)', flexShrink: 0 }}>
                    {item.image_url && <img src={item.image_url} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <span style={{ fontSize: '0.6875rem', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 600, letterSpacing: '0.05em' }}>{item.category}</span>
                    <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', backgroundColor: 'var(--surface-container-low)', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)' }}>
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '1.125rem', color: 'var(--on-surface)', width: '24px' }}>−</button>
                        <span style={{ fontWeight: 600, minWidth: '16px', textAlign: 'center', fontSize: '0.875rem' }}>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '1.125rem', color: 'var(--on-surface)', width: '24px' }}>+</button>
                      </div>
                      <p style={{ fontFamily: 'var(--font-noto-serif)', fontSize: '1.125rem', color: 'var(--primary)', fontWeight: 600, whiteSpace: 'nowrap' }}>₹{item.price * item.quantity}</p>
                    </div>
                  </div>
                  <button onClick={() => removeItem(item.id)} style={{ background: 'none', border: 'none', color: 'var(--on-surface-variant)', cursor: 'pointer', padding: '0.5rem', flexShrink: 0, fontSize: '1.25rem' }} title="Remove">×</button>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div style={{ 
              position: 'sticky', 
              top: '100px', 
              padding: '2rem', 
              backgroundColor: 'var(--surface)', 
              borderRadius: 'var(--radius-lg)', 
              boxShadow: 'var(--shadow-lg)' 
            }}>
              <h3 className="heading-title" style={{ marginBottom: '1.5rem' }}>Order Summary</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', color: 'var(--on-surface-variant)', fontSize: '0.9375rem' }}>
                <span>Subtotal ({totalItems} items)</span>
                <span>₹{subtotal}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', color: 'var(--primary)', fontSize: '0.875rem', fontWeight: 500 }}>
                <span>Shipping</span>
                <span>{subtotal >= 499 ? 'Free!' : '₹49'}</span>
              </div>
              <div style={{ borderTop: '1px solid var(--outline-variant)', paddingTop: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <span style={{ fontWeight: 600, fontSize: '1.0625rem' }}>Total</span>
                <span style={{ fontFamily: 'var(--font-noto-serif)', fontSize: '1.5rem', color: 'var(--primary)', fontWeight: 700 }}>₹{subtotal >= 499 ? subtotal : subtotal + 49}</span>
              </div>
              <Link href="/checkout" className="btn-primary" style={{ width: '100%', textAlign: 'center', padding: '1rem' }}>
                Proceed to Checkout
              </Link>
              <div style={{ marginTop: '1rem', fontSize: '0.75rem', color: 'var(--on-surface-variant)', textAlign: 'center', display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <span>🔒 Secure Checkout</span>
                <span>↩ 30-Day Returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
