"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const { totalItems } = useCart();
  const { user, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => setIsMenuOpen(false), [pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/products' },
    { name: 'Our Story', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`glass-nav ${isScrolled ? 'scrolled' : ''}`} style={{ 
      position: 'sticky', 
      top: 0, 
      zIndex: 1000,
      transition: 'all 0.3s ease',
      height: '80px',
      display: 'flex',
      alignItems: 'center'
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', position: 'relative' }}>
        
        {/* Mobile Toggle */}
        <button 
          className="mobile-only" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', zIndex: 1100, padding: '0.25rem' }}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          ) : (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          )}
        </button>

        {/* Logo */}
        <Link href="/" style={{ fontSize: '1.5rem', fontFamily: 'var(--font-noto-serif)', color: 'var(--primary)', fontWeight: 700, zIndex: 1100, position: 'absolute', left: '50%', transform: 'translateX(-50%)' }} className="nav-logo">
          Shudhham
        </Link>
        
        {/* Desktop Links (Left aligned relative to container, pushing logo to center visually if possible, but absolute center is better) */}
        <div className="desktop-only" style={{ display: 'flex', gap: '2.5rem', alignItems: 'center', flex: 1 }}>
          {navLinks.map(link => (
            <Link 
              key={link.path} 
              href={link.path} 
              style={{ 
                fontSize: '14px',
                fontWeight: pathname === link.path ? 600 : 400, 
                color: pathname === link.path ? 'var(--primary)' : 'var(--on-surface-variant)',
                position: 'relative',
                padding: '4px 0',
                transition: 'color 0.2s'
              }}
            >
              {link.name}
              {pathname === link.path && (
                <span style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '2px', backgroundColor: 'var(--primary)', borderRadius: '2px' }} />
              )}
            </Link>
          ))}
        </div>

        {/* Icons / Auth (Right aligned) */}
        <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', flex: 1, justifyContent: 'flex-end', zIndex: 1100 }}>
          <div className="desktop-only">
            {user ? (
              <Link href="/profile" className="btn-secondary" style={{ padding: '0.5rem 1.25rem', fontSize: '14px' }}>
                Account
              </Link>
            ) : (
              <Link href="/login" className="btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '14px' }}>
                Sign In
              </Link>
            )}
          </div>

          <Link href="/cart" style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--on-surface)' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
            <span className="cart-badge">{totalItems > 99 ? '99+' : totalItems}</span>
          </Link>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMenuOpen && (
        <div className="animate-fade-in" style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100vh', 
          backgroundColor: 'var(--surface)', 
          zIndex: 1050,
          display: 'flex',
          flexDirection: 'column',
          padding: '100px 2rem 2rem 2rem',
          overflowY: 'auto'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {navLinks.map(link => (
              <Link key={link.path} href={link.path} style={{ fontSize: '1.25rem', fontFamily: 'var(--font-inter)', fontWeight: 500, color: pathname === link.path ? 'var(--primary)' : 'var(--on-surface)', padding: '0.5rem 0' }}>
                {link.name}
              </Link>
            ))}
            <div style={{ paddingTop: '1rem', marginTop: '1rem', borderTop: '1px solid var(--outline-variant)' }}>
              {user ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', backgroundColor: 'var(--surface-container-low)', padding: '1.25rem', borderRadius: 'var(--radius-lg)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--primary-container)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                      {user.email?.[0].toUpperCase()}
                    </div>
                    <span style={{ fontSize: '0.875rem', color: 'var(--on-surface-variant)', wordBreak: 'break-all' }}>{user.email}</span>
                  </div>
                  <Link href="/profile" className="btn-secondary" style={{ textAlign: 'center', width: '100%', padding: '0.75rem' }}>Dashboard</Link>
                  <button onClick={() => { signOut(); window.location.href = '/'; }} style={{ background: 'none', border: 'none', color: 'var(--error)', fontSize: '0.875rem', cursor: 'pointer', padding: '0.75rem', fontWeight: 600 }}>Sign Out</button>
                </div>
              ) : (
                <Link href="/login" className="btn-primary" style={{ textAlign: 'center', display: 'block', width: '100%', padding: '1rem' }}>Sign In</Link>
              )}
            </div>
            
            <div style={{ marginTop: 'auto', paddingTop: '4rem', textAlign: 'center', color: 'var(--on-surface-variant)', fontSize: '0.875rem' }}>
              <p>📍 New Delhi, India</p>
              <p style={{ marginTop: '0.5rem' }}>✉️ shivskukreja@gmail.com</p>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .cart-badge {
          position: absolute;
          top: -8px;
          right: -8px;
          background-color: var(--primary);
          color: white;
          font-size: 11px;
          font-weight: 700;
          min-width: 20px;
          height: 20px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 4px;
        }
        @media (max-width: 768px) {
          .desktop-only { display: none !important; }
          .nav-logo { position: static !important; transform: none !important; }
        }
        @media (min-width: 769px) {
          .mobile-only { display: none !important; }
        }
      `}</style>
    </nav>
  );
}
