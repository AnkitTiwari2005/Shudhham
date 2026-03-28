"use client"
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { createClientSupabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';

export default function SignupPage() {
  const { user } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // If user is already logged in, redirect them
  useEffect(() => {
    if (user) {
      window.location.href = '/';
    }
  }, [user]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);
    const supabaseBrowser = createClientSupabase();
    const { error } = await supabaseBrowser.auth.signUp({ 
      email, 
      password,
      options: {
        data: { full_name: fullName }
      }
    });
    
    setIsLoading(false);
    if (error) {
      setMessage({ text: error.message, type: 'error' });
    } else {
      setMessage({ text: 'Success! Please check your email for a verification link.', type: 'success' });
    }
  };

  const handleGoogleLogin = async () => {
    const supabaseBrowser = createClientSupabase();
    await supabaseBrowser.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback` }
    });
  };

  return (
    <div style={{ backgroundColor: 'var(--surface-container-low)', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1.25rem' }}>
      <div style={{ backgroundColor: 'var(--surface)', padding: '3rem 2rem', borderRadius: '1rem', width: '100%', maxWidth: '450px', boxShadow: '0 20px 40px rgba(0,0,0,0.03)' }}>
        <h1 className="heading-headline" style={{ textAlign: 'center', marginBottom: '1rem' }}>Create Account</h1>
        <p style={{ textAlign: 'center', color: 'var(--on-surface-variant)', marginBottom: '2.5rem' }}>Join Shudhham today</p>

        <button onClick={handleGoogleLogin} className="btn-secondary" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '1.5rem', padding: '0.875rem' }}>
          <svg width="20" height="20" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
          Sign up with Google
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ flex: 1, borderTop: '1px solid var(--outline-variant)' }} />
          <span style={{ fontSize: '0.875rem', color: 'var(--on-surface-variant)' }}>or</span>
          <div style={{ flex: 1, borderTop: '1px solid var(--outline-variant)' }} />
        </div>

        <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', fontWeight: 500 }}>Full Name</label>
            <input type="text" required style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--outline-variant)' }} onChange={e => setFullName(e.target.value)} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', fontWeight: 500 }}>Email Address</label>
            <input type="email" required style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--outline-variant)' }} onChange={e => setEmail(e.target.value)} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', fontWeight: 500 }}>Password</label>
            <input type="password" required minLength={6} style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--outline-variant)' }} onChange={e => setPassword(e.target.value)} />
          </div>

          {message && (
            <p style={{ color: message.type === 'error' ? 'var(--error)' : 'var(--primary)', fontSize: '0.875rem', textAlign: 'center', fontWeight: 500 }}>
              {message.text}
            </p>
          )}

          <button type="submit" disabled={isLoading} className="btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.875rem', color: 'var(--on-surface-variant)' }}>
          Already have an account? <Link href="/login" style={{ color: 'var(--primary)', fontWeight: 600 }}>Sign In</Link>
        </p>
      </div>
    </div>
  );
}
