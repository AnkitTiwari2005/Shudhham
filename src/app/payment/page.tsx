"use client"
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

// ─── Stripe Checkout Form ───
function StripeCheckoutForm({ shipping, onSuccess, subtotal }: { shipping: any; onSuccess: () => void; subtotal: number }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);
    setErrorMessage('');

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/order-success`,
      },
      redirect: 'if_required',
    });

    if (error) {
      setErrorMessage(error.message || 'Payment failed. Please try again.');
      setIsProcessing(false);
    } else {
      // Payment succeeded without redirect
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement options={{ layout: 'tabs' }} />
      {errorMessage && (
        <p style={{ color: 'var(--error)', fontSize: '0.875rem', marginTop: '1rem', padding: '0.75rem', backgroundColor: 'rgba(186,26,26,0.05)', borderRadius: 'var(--radius-sm)' }}>
          {errorMessage}
        </p>
      )}
      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="btn-primary"
        style={{ width: '100%', marginTop: '2rem', padding: '1rem' }}
      >
        {isProcessing ? 'Processing Payment...' : `Pay ₹${subtotal} Securely 🔒`}
      </button>
    </form>
  );
}

// ─── COD Form ───
function CODForm({ onSuccess, subtotal }: { onSuccess: () => void; subtotal: number }) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = () => {
    setIsProcessing(true);
    // Simulate COD order placement
    setTimeout(() => onSuccess(), 800);
  };

  return (
    <div>
      <div style={{ padding: '1.5rem', backgroundColor: 'var(--surface-container-low)', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem' }}>
        <p style={{ color: 'var(--on-surface-variant)', fontSize: '0.9375rem', lineHeight: 1.6 }}>
          💵 Pay with cash upon delivery. Please have the exact amount of <strong style={{ color: 'var(--primary)' }}>₹{subtotal}</strong> ready.
        </p>
      </div>
      <button
        onClick={handleSubmit}
        disabled={isProcessing}
        className="btn-primary"
        style={{ width: '100%', padding: '1rem' }}
      >
        {isProcessing ? 'Placing Order...' : `Place COD Order — ₹${subtotal}`}
      </button>
    </div>
  );
}

// ─── Main Payment Page ───
export default function PaymentPage() {
  const { items, subtotal, clearCart } = useCart();
  const router = useRouter();
  const [shippingData, setShippingData] = useState<any>(null);
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [clientSecret, setClientSecret] = useState('');
  const [isLoadingIntent, setIsLoadingIntent] = useState(false);

  useEffect(() => {
    const data = sessionStorage.getItem('shudhham_shipping');
    if (data) {
      setShippingData(JSON.parse(data));
    } else {
      router.push('/checkout');
    }
  }, [router]);

  // Create payment intent when card is selected
  useEffect(() => {
    if (selectedMethod === 'card' && subtotal > 0 && shippingData && !clientSecret) {
      setIsLoadingIntent(true);
      fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: subtotal, shipping: shippingData }),
      })
        .then(res => res.json())
        .then(data => {
          if (data.clientSecret) {
            setClientSecret(data.clientSecret);
          } else {
            console.error('No client secret:', data.error);
          }
          setIsLoadingIntent(false);
        })
        .catch(err => {
          console.error('Payment intent error:', err);
          setIsLoadingIntent(false);
        });
    }
  }, [selectedMethod, subtotal, shippingData]);

  const handleOrderSuccess = async () => {
    // Create order in database
    try {
      await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          shipping: shippingData,
          total_amount: subtotal,
        }),
      });
    } catch (err) {
      console.error('Order save error:', err);
    }

    clearCart();
    sessionStorage.removeItem('shudhham_shipping');
    router.push('/order-success');
  };

  if (!shippingData) return null;

  const stripeOptions = clientSecret ? {
    clientSecret,
    appearance: {
      theme: 'stripe' as const,
      variables: {
        colorPrimary: '#4A7C59',
        colorBackground: '#ffffff',
        colorText: '#2C3E2F',
        colorDanger: '#ba1a1a',
        fontFamily: 'Inter, system-ui, sans-serif',
        borderRadius: '0.75rem',
        spacingUnit: '4px',
      },
    },
  } : undefined;

  return (
    <div className="page-padding" style={{ backgroundColor: 'var(--surface-container-low)', minHeight: '100vh' }}>
      <div className="container">
        
        {/* Breadcrumb */}
        <div style={{ marginBottom: '2rem', fontSize: '0.875rem', color: 'var(--on-surface-variant)', display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <Link href="/cart" style={{ color: 'var(--on-surface-variant)' }}>Cart</Link>
          <span>›</span>
          <Link href="/checkout" style={{ color: 'var(--on-surface-variant)' }}>Shipping</Link>
          <span>›</span>
          <span style={{ color: 'var(--primary)', fontWeight: 600 }}>Payment</span>
        </div>

        <div className="responsive-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 380px', gap: '2rem', alignItems: 'start' }}>
          
          {/* Payment Flow */}
          <div style={{ padding: '2rem', backgroundColor: 'var(--surface)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
            
            {/* Shipping Summary */}
            <div style={{ backgroundColor: 'var(--surface-container-highest)', padding: '1.25rem', borderRadius: 'var(--radius-md)', marginBottom: '2.5rem', fontSize: '0.875rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(0,0,0,0.05)', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <span style={{ color: 'var(--on-surface-variant)', width: '70px', flexShrink: 0 }}>Contact</span>
                <span style={{ flex: 1, minWidth: '150px', wordBreak: 'break-all' }}>{shippingData.email}</span>
                <Link href="/checkout" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>Change</Link>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
                <span style={{ color: 'var(--on-surface-variant)', width: '70px', flexShrink: 0 }}>Ship to</span>
                <span style={{ flex: 1, minWidth: '150px' }}>{shippingData.address}, {shippingData.city}, {shippingData.state} {shippingData.pinCode}</span>
                <Link href="/checkout" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>Change</Link>
              </div>
            </div>

            {/* Method Selector */}
            <h2 className="heading-title" style={{ marginBottom: '0.5rem' }}>Payment Method</h2>
            <p style={{ color: 'var(--on-surface-variant)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>All transactions are secure and encrypted.</p>

            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
              {[
                { id: 'card', label: '💳 Card / UPI', desc: 'Stripe Secure' },
                { id: 'cod', label: '💵 Cash on Delivery', desc: 'Pay at door' },
              ].map(method => (
                <button
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  style={{
                    flex: 1,
                    minWidth: '140px',
                    padding: '1.25rem',
                    border: `2px solid ${selectedMethod === method.id ? 'var(--primary)' : 'var(--outline-variant)'}`,
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: selectedMethod === method.id ? 'var(--secondary-container)' : 'transparent',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s',
                  }}
                >
                  <div style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.25rem' }}>{method.label}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--on-surface-variant)' }}>{method.desc}</div>
                </button>
              ))}
            </div>

            {/* Payment Content */}
            <div style={{ minHeight: '200px' }}>
              {selectedMethod === 'card' && (
                <>
                  {isLoadingIntent ? (
                    <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--on-surface-variant)' }}>
                      <div style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>🔐</div>
                      <p>Loading secure payment form...</p>
                    </div>
                  ) : clientSecret && stripeOptions ? (
                    <Elements stripe={stripePromise} options={stripeOptions}>
                      <StripeCheckoutForm shipping={shippingData} onSuccess={handleOrderSuccess} subtotal={subtotal} />
                    </Elements>
                  ) : (
                    <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--on-surface-variant)' }}>
                      <p>Unable to load payment form. Please refresh the page.</p>
                    </div>
                  )}
                </>
              )}

              {selectedMethod === 'cod' && (
                <CODForm onSuccess={handleOrderSuccess} subtotal={subtotal} />
              )}
            </div>

            <div style={{ marginTop: '2rem' }}>
              <Link href="/checkout" style={{ color: 'var(--on-surface-variant)', fontSize: '0.875rem' }}>← Return to shipping</Link>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div style={{ position: 'sticky', top: '100px', backgroundColor: 'var(--surface)', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)' }}>
            <h3 className="heading-title" style={{ marginBottom: '1.5rem' }}>Order Summary</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
              {items.map(item => (
                <div key={item.id} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <div style={{ width: '50px', height: '50px', borderRadius: 'var(--radius-sm)', overflow: 'hidden', backgroundColor: 'var(--surface-container-highest)', position: 'relative', flexShrink: 0 }}>
                    {item.image_url && <img src={item.image_url} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                    <span className="badge badge-primary" style={{ position: 'absolute', top: '-4px', right: '-4px', minWidth: '18px', height: '18px' }}>{item.quantity}</span>
                  </div>
                  <span style={{ flex: 1, fontSize: '0.875rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</span>
                  <span style={{ fontWeight: 600, fontSize: '0.875rem', flexShrink: 0 }}>₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            
            <div style={{ borderTop: '1px solid var(--outline-variant)', paddingTop: '1rem', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', color: 'var(--on-surface-variant)', fontSize: '0.875rem' }}>
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--primary)', fontSize: '0.875rem', fontWeight: 500 }}>
                <span>Shipping</span>
                <span>Free</span>
              </div>
            </div>
            
            <div style={{ borderTop: '1px solid var(--outline-variant)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '1.125rem', fontWeight: 600 }}>Total</span>
              <span style={{ fontFamily: 'var(--font-noto-serif)', fontSize: '1.5rem', color: 'var(--primary)', fontWeight: 700 }}>₹{subtotal}</span>
            </div>

            <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: 'var(--surface-container-low)', borderRadius: 'var(--radius-sm)', fontSize: '0.75rem', color: 'var(--on-surface-variant)', textAlign: 'center', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <span>🔒 SSL Encrypted</span>
              <span>💳 Stripe Secure</span>
              <span>↩ 30-Day Returns</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
