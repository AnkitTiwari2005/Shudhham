"use client"
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { createClientSupabase } from '@/lib/supabase';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const { items, subtotal } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  
  const [savedAddresses, setSavedAddresses] = useState<any[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [useNewAddress, setUseNewAddress] = useState(true);
  
  const [formData, setFormData] = useState({
    email: user?.email || '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    pinCode: '',
    phone: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Load saved addresses
  useEffect(() => {
    if (!user) return;
    const loadAddresses = async () => {
      try {
        const supabaseBrowser = createClientSupabase();
        const { data, error } = await supabaseBrowser
          .from('addresses')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
        
        if (error) {
          console.error('Failed to load addresses:', error.message);
          return;
        }
        if (data && data.length > 0) {
          setSavedAddresses(data);
          setUseNewAddress(false);
          setSelectedAddressId(data[0].id);
        }
      } catch (err) {
        console.error('Address fetch error:', err);
      }
    };
    loadAddresses();
  }, [user]);

  // Update email when user loads
  useEffect(() => {
    if (user?.email && !formData.email) {
      setFormData(prev => ({ ...prev, email: user.email || '' }));
    }
  }, [user]);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.email) errs.email = 'Email is required';
    
    if (useNewAddress) {
      if (!formData.firstName) errs.firstName = 'First name is required';
      if (!formData.address) errs.address = 'Address is required';
      if (!formData.city) errs.city = 'City is required';
      if (!formData.state) errs.state = 'State is required';
      if (!formData.pinCode || formData.pinCode.length !== 6) errs.pinCode = 'Valid PIN code required';
      if (!formData.phone || formData.phone.length < 10) errs.phone = 'Valid phone is required';
    }
    
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    let shippingData;
    if (!useNewAddress && selectedAddressId) {
      const addr = savedAddresses.find(a => a.id === selectedAddressId);
      if (addr) {
        shippingData = {
          email: formData.email,
          firstName: addr.first_name,
          lastName: addr.last_name,
          address: addr.address_line1 + (addr.address_line2 ? ', ' + addr.address_line2 : ''),
          city: addr.city,
          state: addr.state,
          pinCode: addr.pin_code,
          phone: addr.phone
        };
      }
    }
    
    if (!shippingData) {
      shippingData = formData;
    }
    
    sessionStorage.setItem('shudhham_shipping', JSON.stringify(shippingData));
    router.push('/payment');
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  if (items.length === 0) {
    return (
      <div className="section-padding" style={{ textAlign: 'center' }}>
        <div className="container">
          <h1 className="heading-headline">No items to checkout</h1>
          <Link href="/products" className="btn-primary" style={{ marginTop: '2rem', display: 'inline-block' }}>Continue Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-padding" style={{ backgroundColor: 'var(--surface-container-low)', minHeight: '100vh' }}>
      <div className="container">
        {/* Breadcrumb */}
        <div style={{ marginBottom: '2rem', fontSize: '0.875rem', color: 'var(--on-surface-variant)', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <Link href="/cart" style={{ color: 'var(--on-surface-variant)' }}>Cart</Link>
          <span>›</span>
          <span style={{ color: 'var(--primary)', fontWeight: 600 }}>Shipping</span>
          <span>›</span>
          <span style={{ color: 'var(--on-surface-variant)' }}>Payment</span>
        </div>

        <div className="grid-checkout">
          {/* Form */}
          <div style={{ backgroundColor: 'var(--surface)', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
            <form onSubmit={handleSubmit}>
              <h2 className="heading-title" style={{ marginBottom: '1.5rem' }}>Contact Information</h2>
              <input className="input-field" type="email" placeholder="Email address" value={formData.email} onChange={e => handleChange('email', e.target.value)} style={{ marginBottom: errors.email ? '0.25rem' : '2rem' }} />
              {errors.email && <p style={{ color: 'var(--error)', fontSize: '0.75rem', marginBottom: '1.5rem' }}>{errors.email}</p>}

              <h2 className="heading-title" style={{ marginBottom: '1.5rem' }}>Delivery Address</h2>
              
              {/* Saved Addresses */}
              {savedAddresses.length > 0 && (
                <div style={{ marginBottom: '2rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1rem' }}>
                    {savedAddresses.map(addr => (
                      <label key={addr.id} style={{
                        display: 'flex', gap: '1rem', padding: '1rem', border: `1.5px solid ${!useNewAddress && selectedAddressId === addr.id ? 'var(--primary)' : 'var(--outline-variant)'}`,
                        borderRadius: 'var(--radius-md)', cursor: 'pointer', backgroundColor: !useNewAddress && selectedAddressId === addr.id ? 'var(--secondary-container)' : 'transparent',
                        transition: 'all 0.2s'
                      }}>
                        <input type="radio" name="address_choice" checked={!useNewAddress && selectedAddressId === addr.id}
                          onChange={() => { setUseNewAddress(false); setSelectedAddressId(addr.id); }}
                          style={{ accentColor: 'var(--primary)', marginTop: '2px' }} />
                        <div>
                          <p style={{ fontWeight: 600, fontSize: '0.9375rem' }}>{addr.first_name} {addr.last_name}</p>
                          <p style={{ fontSize: '0.8125rem', color: 'var(--on-surface-variant)', lineHeight: 1.5 }}>
                            {addr.address_line1}{addr.address_line2 ? ', ' + addr.address_line2 : ''}<br />
                            {addr.city}, {addr.state} {addr.pin_code} · {addr.phone}
                          </p>
                        </div>
                      </label>
                    ))}
                    
                    <label style={{
                      display: 'flex', gap: '1rem', padding: '1rem', border: `1.5px solid ${useNewAddress ? 'var(--primary)' : 'var(--outline-variant)'}`,
                      borderRadius: 'var(--radius-md)', cursor: 'pointer', backgroundColor: useNewAddress ? 'var(--secondary-container)' : 'transparent',
                      transition: 'all 0.2s'
                    }}>
                      <input type="radio" name="address_choice" checked={useNewAddress}
                        onChange={() => setUseNewAddress(true)}
                        style={{ accentColor: 'var(--primary)', marginTop: '2px' }} />
                      <span style={{ fontWeight: 500 }}>Use a new address</span>
                    </label>
                  </div>
                </div>
              )}

              {/* New Address Form */}
              {useNewAddress && (
                <div style={{ display: 'grid', gap: '1rem' }}>
                  <div className="grid-half" style={{ gap: '1rem' }}>
                    <div>
                      <input className="input-field" type="text" placeholder="First Name" onChange={e => handleChange('firstName', e.target.value)} />
                      {errors.firstName && <p style={{ color: 'var(--error)', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.firstName}</p>}
                    </div>
                    <input className="input-field" type="text" placeholder="Last Name" onChange={e => handleChange('lastName', e.target.value)} />
                  </div>
                  <div>
                    <input className="input-field" type="text" placeholder="Full Address (House No, Street, Area)" onChange={e => handleChange('address', e.target.value)} />
                    {errors.address && <p style={{ color: 'var(--error)', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.address}</p>}
                  </div>
                  <div className="grid-thirds" style={{ gap: '1rem' }}>
                    <div>
                      <input className="input-field" type="text" placeholder="City" onChange={e => handleChange('city', e.target.value)} />
                      {errors.city && <p style={{ color: 'var(--error)', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.city}</p>}
                    </div>
                    <div>
                      <input className="input-field" type="text" placeholder="State" onChange={e => handleChange('state', e.target.value)} />
                      {errors.state && <p style={{ color: 'var(--error)', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.state}</p>}
                    </div>
                    <div>
                      <input className="input-field" type="text" placeholder="PIN Code" maxLength={6} onChange={e => handleChange('pinCode', e.target.value)} />
                      {errors.pinCode && <p style={{ color: 'var(--error)', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.pinCode}</p>}
                    </div>
                  </div>
                  <div>
                    <input className="input-field" type="tel" placeholder="Phone Number" maxLength={10} onChange={e => handleChange('phone', e.target.value)} />
                    {errors.phone && <p style={{ color: 'var(--error)', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.phone}</p>}
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                <Link href="/cart" style={{ color: 'var(--on-surface-variant)', fontSize: '0.875rem' }}>← Return to cart</Link>
                <button type="submit" className="btn-primary" style={{ width: 'auto' }}>Continue to Payment →</button>
              </div>
            </form>
          </div>

          {/* Summary */}
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
            <div style={{ borderTop: '1px solid var(--outline-variant)', paddingTop: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--on-surface-variant)' }}>
                <span>Subtotal</span><span>₹{subtotal}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '0.875rem', color: 'var(--primary)', fontWeight: 500 }}>
                <span>Shipping</span><span>Free</span>
              </div>
              <div style={{ borderTop: '1px solid var(--outline-variant)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 600 }}>Total</span>
                <span style={{ fontFamily: 'var(--font-noto-serif)', fontSize: '1.375rem', color: 'var(--primary)', fontWeight: 700 }}>₹{subtotal}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
