"use client"
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { CheckCircle, Package, Mail } from 'lucide-react';

export default function OrderSuccessPage() {
  const [orderId] = useState(() => {
    // Generate a display-friendly order ID
    return Math.random().toString(36).substring(2, 10).toUpperCase();
  });

  useEffect(() => {
    // Clean up any remaining session data
    sessionStorage.removeItem('shudhham_shipping');
  }, []);

  return (
    <div className="section-padding" style={{ textAlign: 'center', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ maxWidth: '600px' }}>
        <div className="animate-fade-in" style={{ backgroundColor: 'var(--surface)', padding: '3rem 2rem', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-lg)' }}>
          
          <div style={{ 
            width: '80px', 
            height: '80px', 
            borderRadius: '50%', 
            backgroundColor: 'var(--secondary-container)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            margin: '0 auto 2rem auto',
            fontSize: '2.5rem',
            color: 'var(--primary)'
          }}>
            <CheckCircle size={40} />
          </div>
          
          <h1 className="heading-headline" style={{ marginBottom: '0.75rem', color: 'var(--primary)' }}>
            Order Confirmed!
          </h1>
          <p style={{ color: 'var(--on-surface-variant)', fontSize: '1.125rem', marginBottom: '2rem', lineHeight: 1.6 }}>
            Thank you for your order. You will receive a confirmation email shortly with your order details.
          </p>

          <div style={{ 
            backgroundColor: 'var(--surface-container-low)', 
            padding: '1.25rem', 
            borderRadius: 'var(--radius-md)', 
            marginBottom: '2.5rem',
            display: 'inline-block'
          }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--on-surface-variant)', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '0.25rem' }}>
              Order Reference
            </span>
            <span style={{ fontFamily: 'monospace', fontSize: '1.25rem', fontWeight: 700, color: 'var(--primary)', letterSpacing: '0.05em' }}>
              #{orderId}
            </span>
          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/profile" className="btn-primary">View My Orders</Link>
            <Link href="/products" className="btn-secondary">Continue Shopping</Link>
          </div>

          <div style={{ marginTop: '2.5rem', fontSize: '0.8125rem', color: 'var(--on-surface-variant)', display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><Package size={16} /> Ships within 2-3 days</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><Mail size={16} /> Confirmation email sent</span>
          </div>
        </div>
      </div>
    </div>
  );
}
