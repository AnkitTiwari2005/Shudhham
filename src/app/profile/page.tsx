"use client"
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { createClientSupabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';
import { Package } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('profile');
  const [profile, setProfile] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [addresses, setAddresses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Edit Profile State
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  // Address State
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [isSavingAddress, setIsSavingAddress] = useState(false);
  const [addressError, setAddressError] = useState('');
  const [addressForm, setAddressForm] = useState({
    first_name: '', last_name: '', address_line1: '', address_line2: '', city: '', state: '', pin_code: '', phone: ''
  });

  useEffect(() => {
    // Check URL parameters for tab selection
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get('tab');
      if (tab && ['profile', 'orders', 'addresses'].includes(tab)) {
        setActiveTab(tab);
      }
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchOrders();
      fetchAddresses();
    }
  }, [user]);

  const fetchProfile = async () => {
    const supabaseBrowser = createClientSupabase();
    const { data, error } = await supabaseBrowser.from('profiles').select('*').eq('id', user?.id).single();
    if (data) {
      setProfile(data);
      setFullName(data.full_name || '');
      setPhone(data.phone || '');
      setAge(data.age?.toString() || '');
    } else {
      console.log('No profile found, will create on save. Error:', error?.message);
    }
  };

  const fetchOrders = async () => {
    const supabaseBrowser = createClientSupabase();
    const { data } = await supabaseBrowser
      .from('orders')
      .select('*, order_items(*)')
      .eq('user_id', user?.id)
      .order('created_at', { ascending: false });
    setOrders(data || []);
    setIsLoading(false);
  };

  const fetchAddresses = async () => {
    const supabaseBrowser = createClientSupabase();
    const { data } = await supabaseBrowser
      .from('addresses')
      .select('*')
      .eq('user_id', user?.id)
      .order('created_at', { ascending: false });
    setAddresses(data || []);
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveMessage('');
    
    const supabaseBrowser = createClientSupabase();
    
    // Try update first, then insert as fallback
    const profileData = {
      id: user?.id,
      full_name: fullName,
      email: user?.email,
      phone: phone || null,
      age: age ? parseInt(age) : null,
      updated_at: new Date().toISOString()
    };

    // Attempt upsert
    const { error } = await supabaseBrowser
      .from('profiles')
      .upsert(profileData, { onConflict: 'id' });
      
    setIsSaving(false);
    if (error) {
      console.error('Profile Save Error:', JSON.stringify(error));
      setSaveMessage(`Failed: ${error.message}`);
    } else {
      setSaveMessage('Profile updated successfully!');
      setProfile({ ...profile, full_name: fullName, phone, age });
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  const handleSaveAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingAddress(true);
    setAddressError('');
    
    const supabaseBrowser = createClientSupabase();
    const { error } = await supabaseBrowser
      .from('addresses')
      .insert([{ ...addressForm, user_id: user?.id }]);
      
    setIsSavingAddress(false);
    if (!error) {
      setShowAddressForm(false);
      fetchAddresses();
      setAddressForm({ first_name: '', last_name: '', address_line1: '', address_line2: '', city: '', state: '', pin_code: '', phone: ''});
    } else {
      console.error('Address Save Error:', JSON.stringify(error));
      setAddressError(`Failed: ${error.message}`);
    }
  };

  const handleDeleteAddress = async (id: string) => {
    const supabaseBrowser = createClientSupabase();
    await supabaseBrowser.from('addresses').delete().eq('id', id);
    fetchAddresses();
  };

  if (!user) return null;

  return (
    <div className="page-padding" style={{ backgroundColor: 'var(--surface-container-low)', minHeight: '100vh' }}>
      <div className="container">
        
        <div className="grid-profile">
          
          {/* Sidebar */}
          <div style={{ backgroundColor: 'var(--surface)', padding: '2rem', borderRadius: 'var(--radius-lg)', display: 'flex', flexDirection: 'column', gap: '0.5rem', position: 'sticky', top: '100px', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
               <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'var(--primary-container)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 600, flexShrink: 0 }}>
                 {user.email?.[0].toUpperCase()}
               </div>
               <div style={{ minWidth: 0 }}>
                 <h3 style={{ fontSize: '1.125rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{profile?.full_name || 'Shudhham Member'}</h3>
                 <p style={{ fontSize: '0.875rem', color: 'var(--on-surface-variant)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.email}</p>
               </div>
            </div>

            <button onClick={() => setActiveTab('profile')} style={{ textAlign: 'left', padding: '0.875rem 1rem', borderRadius: 'var(--radius-sm)', border: 'none', backgroundColor: activeTab === 'profile' ? 'var(--secondary-container)' : 'transparent', color: activeTab === 'profile' ? 'var(--primary)' : 'var(--on-surface)', cursor: 'pointer', fontWeight: 500, transition: 'background-color 0.2s' }}>
              Profile Details
            </button>
            <button onClick={() => setActiveTab('orders')} style={{ textAlign: 'left', padding: '0.875rem 1rem', borderRadius: 'var(--radius-sm)', border: 'none', backgroundColor: activeTab === 'orders' ? 'var(--secondary-container)' : 'transparent', color: activeTab === 'orders' ? 'var(--primary)' : 'var(--on-surface)', cursor: 'pointer', fontWeight: 500, transition: 'background-color 0.2s' }}>
              My Orders
            </button>
            <button onClick={() => setActiveTab('addresses')} style={{ textAlign: 'left', padding: '0.875rem 1rem', borderRadius: 'var(--radius-sm)', border: 'none', backgroundColor: activeTab === 'addresses' ? 'var(--secondary-container)' : 'transparent', color: activeTab === 'addresses' ? 'var(--primary)' : 'var(--on-surface)', cursor: 'pointer', fontWeight: 500, transition: 'background-color 0.2s' }}>
              Saved Addresses
            </button>
            
            <div style={{ borderTop: '1px solid var(--outline-variant)', margin: '1rem 0', opacity: 0.5 }} />
            
            <button onClick={() => { signOut(); window.location.href='/'; }} style={{ textAlign: 'left', padding: '0.875rem 1rem', borderRadius: 'var(--radius-sm)', border: 'none', backgroundColor: 'transparent', color: 'var(--error)', cursor: 'pointer', fontWeight: 500 }}>
              Sign Out
            </button>
          </div>

          {/* Content */}
          <div style={{ minHeight: '500px' }}>
            {activeTab === 'profile' && (
              <div className="animate-fade-in" style={{ backgroundColor: 'var(--surface)', padding: '2.5rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
                <h2 className="heading-title" style={{ marginBottom: '2rem' }}>Profile Details</h2>
                <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '500px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', fontWeight: 500 }}>Full Name</label>
                    <input className="input-field" type="text" value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Your Name" />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', fontWeight: 500 }}>Email Address</label>
                    <input className="input-field" type="email" value={user.email} disabled style={{ backgroundColor: 'var(--surface-container-low)', opacity: 0.7, cursor: 'not-allowed' }} />
                    <p style={{ fontSize: '0.75rem', color: 'var(--on-surface-variant)', marginTop: '0.5rem' }}>Email cannot be changed.</p>
                  </div>
                  <div className="grid-half" style={{ gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', fontWeight: 500 }}>Phone Number</label>
                      <input className="input-field" type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+91 XXXXX XXXXX" />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', fontWeight: 500 }}>Age</label>
                      <input className="input-field" type="number" value={age} onChange={e => setAge(e.target.value)} placeholder="e.g. 28" min={1} max={120} />
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
                    <button type="submit" disabled={isSaving} className="btn-primary">
                      {isSaving ? 'Saving...' : 'Save Changes'}
                    </button>
                    {saveMessage && <span style={{ fontSize: '0.875rem', color: saveMessage.includes('successfully') ? 'var(--primary)' : 'var(--error)', fontWeight: 500 }}>{saveMessage}</span>}
                  </div>
                </form>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="animate-fade-in" style={{ backgroundColor: 'var(--surface)', padding: '2.5rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
                <h2 className="heading-title" style={{ marginBottom: '2rem' }}>Order History</h2>
                {isLoading ? (
                  <div style={{ padding: '4rem 0', textAlign: 'center', color: 'var(--on-surface-variant)' }}>Loading your orders...</div>
                ) : orders.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {orders.map(order => (
                      <div key={order.id} style={{ border: '1px solid var(--outline-variant)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                        <div style={{ backgroundColor: 'var(--surface-container-low)', padding: '1.25rem 1.5rem', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                          <div>
                            <p style={{ fontSize: '0.8125rem', color: 'var(--on-surface-variant)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>Order Placed</p>
                            <p style={{ fontWeight: 600, fontSize: '0.9375rem' }}>{new Date(order.created_at).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <p style={{ fontSize: '0.8125rem', color: 'var(--on-surface-variant)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>Total</p>
                            <p style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--primary)' }}>₹{order.total_amount}</p>
                          </div>
                          <div>
                            <p style={{ fontSize: '0.8125rem', color: 'var(--on-surface-variant)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>Order #</p>
                            <p style={{ fontSize: '0.9375rem', fontFamily: 'monospace' }}>{order.id.slice(0, 8).toUpperCase()}</p>
                          </div>
                        </div>
                        <div style={{ padding: '1.5rem' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <span className="badge badge-primary" style={{ backgroundColor: '#e8f0e3', color: 'var(--primary)' }}>Processing</span>
                          </div>
                          <div style={{ fontSize: '0.875rem', color: 'var(--on-surface-variant)' }}>
                            <strong>Deliver to:</strong> {order.full_name || 'Customer'}<br/>
                            {order.address}, {order.city}, {order.state} {order.pin_code}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: '4rem 0', backgroundColor: 'var(--surface-container-low)', borderRadius: 'var(--radius-md)' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem', color: 'var(--on-surface-variant)' }}><Package size={40} /></div>
                    <p style={{ color: 'var(--on-surface-variant)', marginBottom: '1.5rem', fontSize: '1.125rem' }}>You haven&apos;t placed any orders yet.</p>
                    <Link href="/products" className="btn-primary">Start your wellness journey</Link>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'addresses' && (
              <div className="animate-fade-in" style={{ backgroundColor: 'var(--surface)', padding: '2.5rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
                <h2 className="heading-title" style={{ marginBottom: '2rem' }}>Saved Addresses</h2>
                
                {addresses.length > 0 ? (
                  <div style={{ display: 'grid', gap: '1.5rem', marginBottom: '2.5rem' }}>
                    {addresses.map(addr => (
                      <div key={addr.id} style={{ border: '1px solid var(--outline-variant)', padding: '1.5rem', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                          <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{addr.first_name} {addr.last_name}</p>
                          <p style={{ fontSize: '0.875rem', color: 'var(--on-surface-variant)', lineHeight: 1.6 }}>
                            {addr.address_line1}<br/>
                            {addr.address_line2 && <>{addr.address_line2}<br/></>}
                            {addr.city}, {addr.state} {addr.pin_code}<br/>
                            Phone: {addr.phone}
                          </p>
                        </div>
                        <button onClick={() => handleDeleteAddress(addr.id)} style={{ background: 'none', border: 'none', color: 'var(--error)', cursor: 'pointer', padding: '0.5rem' }}>Delete</button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: '4rem 0', border: '1.5px dashed var(--outline-variant)', borderRadius: 'var(--radius-md)', marginBottom: '2.5rem' }}>
                    <p style={{ color: 'var(--on-surface-variant)' }}>You have no saved addresses.</p>
                  </div>
                )}

                {!showAddressForm ? (
                  <button onClick={() => setShowAddressForm(true)} className="btn-primary">+ Add New Address</button>
                ) : (
                  <div style={{ backgroundColor: 'var(--surface-container-low)', padding: '2rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--outline-variant)' }}>
                    <h3 className="heading-title" style={{ fontSize: '1.125rem', marginBottom: '1.5rem' }}>Complete New Address</h3>
                    {addressError && <p style={{ color: 'var(--error)', fontSize: '0.875rem', marginBottom: '1rem', padding: '0.75rem', backgroundColor: 'rgba(186,26,26,0.05)', borderRadius: 'var(--radius-sm)' }}>{addressError}</p>}
                    <form onSubmit={handleSaveAddress} className="grid-half" style={{ gap: '1.25rem' }}>
                      <input className="input-field" placeholder="First Name" required value={addressForm.first_name} onChange={e => setAddressForm({...addressForm, first_name: e.target.value})} />
                      <input className="input-field" placeholder="Last Name" required value={addressForm.last_name} onChange={e => setAddressForm({...addressForm, last_name: e.target.value})} />
                      <input className="input-field" placeholder="Address Line 1" style={{ gridColumn: 'span 2' }} required value={addressForm.address_line1} onChange={e => setAddressForm({...addressForm, address_line1: e.target.value})} />
                      <input className="input-field" placeholder="Address Line 2 (Optional)" style={{ gridColumn: 'span 2' }} value={addressForm.address_line2} onChange={e => setAddressForm({...addressForm, address_line2: e.target.value})} />
                      <input className="input-field" placeholder="City" required value={addressForm.city} onChange={e => setAddressForm({...addressForm, city: e.target.value})} />
                      <input className="input-field" placeholder="State" required value={addressForm.state} onChange={e => setAddressForm({...addressForm, state: e.target.value})} />
                      <input className="input-field" placeholder="Pin Code" required value={addressForm.pin_code} onChange={e => setAddressForm({...addressForm, pin_code: e.target.value})} />
                      <input className="input-field" type="tel" placeholder="Phone Number" required value={addressForm.phone} onChange={e => setAddressForm({...addressForm, phone: e.target.value})} />
                      
                      <div style={{ gridColumn: 'span 2', display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                        <button type="submit" disabled={isSavingAddress} className="btn-primary" style={{ width: 'auto' }}>
                          {isSavingAddress ? 'Saving...' : 'Save Address'}
                        </button>
                        <button type="button" className="btn-secondary" style={{ width: 'auto' }} onClick={() => { setShowAddressForm(false); setAddressError(''); }}>Cancel</button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
