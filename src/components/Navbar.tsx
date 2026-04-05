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

  useEffect(() => setIsMenuOpen(false), [pathname]);

  const leftLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/products' },
    { name: 'Ayurveda', path: '/ayurveda' },
  ];

  const rightLinks = [
    { name: 'Naturopathy', path: '/naturopathy' },
    { name: 'Research', path: '/research' },
    { name: 'Contact', path: '/contact' },
  ];

  const allLinks = [...leftLinks, ...rightLinks];

  const linkStyle = (path: string) => ({
    fontSize: '0.8125rem' as const,
    fontWeight: pathname === path ? 600 : 400,
    color: pathname === path ? 'var(--primary)' : 'var(--on-surface-variant)',
    position: 'relative' as const,
    padding: '4px 0',
    transition: 'color 0.2s',
    whiteSpace: 'nowrap' as const,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
  });

  return (
    <>
      <nav className={`glass-nav ${isScrolled ? 'scrolled' : ''}`} style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        transition: 'all 0.3s ease',
        height: '72px',
        display: 'flex',
        alignItems: 'center',
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', width: '100%', position: 'relative' }}>

          {/* === MOBILE: hamburger + logo + cart === */}
          <div className="nav-mobile-bar">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', zIndex: 1100, padding: '0.25rem' }}
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? (
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              ) : (
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
              )}
            </button>

            <Link href="/" style={{
              fontSize: '1.5rem',
              fontFamily: 'var(--font-noto-serif)',
              color: 'var(--primary)',
              fontWeight: 700,
              letterSpacing: '0.02em',
            }}>
              Shudhham
            </Link>

            <Link href="/cart" style={{ position: 'relative', display: 'flex', alignItems: 'center', color: 'var(--on-surface)' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
              <span style={{
                position: 'absolute', top: -6, right: -8,
                backgroundColor: 'var(--primary)', color: 'white',
                fontSize: '10px', fontWeight: 700,
                minWidth: '18px', height: '18px', borderRadius: '9px',
                display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 3px'
              }}>{totalItems > 99 ? '99+' : totalItems}</span>
            </Link>
          </div>

          {/* === DESKTOP: left links | centered logo | right links | auth + cart === */}

          {/* === DESKTOP: left side (links) | right side (links + auth/cart) === */}
          
          <div className="nav-desktop-layout">
            
            {/* Left Zone: flex 1 */}
            <div className="nav-desktop-left" style={{ justifyContent: 'flex-start' }}>
              <div className="nav-desktop-left-links">
                {leftLinks.map(link => (
                  <Link key={link.path} href={link.path} style={linkStyle(link.path)}>
                    {link.name}
                    {pathname === link.path && (
                      <span style={{ position: 'absolute', bottom: -3, left: 0, width: '100%', height: '2px', backgroundColor: 'var(--primary)' }} />
                    )}
                  </Link>
                ))}
              </div>
            </div>

            {/* Center Logo: Absolute */}
            <div className="nav-desktop-logo">
              <Link href="/" style={{
                fontSize: '24px',
                fontFamily: "'Playfair Display', var(--font-noto-serif), serif",
                color: 'var(--primary-dark)',
                fontWeight: 700,
                letterSpacing: '0.02em',
                pointerEvents: 'auto',
                display: 'flex',
                alignItems: 'center',
              }}>
                Shud<span style={{ color: 'var(--primary)', fontWeight: 600 }}>h</span>ham
              </Link>
            </div>

            {/* Right Zone: flex 1 */}
            <div className="nav-desktop-right" style={{ justifyContent: 'flex-end' }}>
              <div className="nav-desktop-right-links">
                {rightLinks.map(link => (
                  <Link key={link.path} href={link.path} style={linkStyle(link.path)}>
                    {link.name}
                    {pathname === link.path && (
                      <span style={{ position: 'absolute', bottom: -3, left: 0, width: '100%', height: '2px', backgroundColor: 'var(--primary)' }} />
                    )}
                  </Link>
                ))}
              </div>

              {/* Vertical Divider */}
              <div style={{ width: '1px', height: '22px', backgroundColor: 'var(--outline-variant)', margin: '0 1rem' }} />

              <div className="nav-desktop-actions">
                {user ? (
                  <Link href="/profile" className="btn-secondary" style={{ padding: '0.4rem 1.125rem', fontSize: '12.5px', borderRadius: '50px' }}>
                    Account
                  </Link>
                ) : (
                  <Link href="/login" className="btn-primary" style={{ padding: '0.4rem 1.25rem', fontSize: '12.5px', borderRadius: '50px', backgroundColor: 'var(--primary)', color: 'white', fontWeight: 600 }}>
                    Sign In
                  </Link>
                )}
                <Link href="/cart" style={{ position: 'relative', display: 'flex', alignItems: 'center', color: 'var(--primary-dark)', marginLeft: '0.5rem' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
                  <span style={{
                    position: 'absolute', top: -4, right: -8,
                    backgroundColor: 'var(--primary)', color: 'white',
                    fontSize: '10px', fontWeight: 700,
                    minWidth: '16px', height: '16px', borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 2px'
                  }}>{totalItems > 99 ? '99+' : totalItems}</span>
                </Link>
              </div>
            </div>

          </div>

        </div>
      </nav>

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
          padding: '90px 2rem 2rem 2rem',
          overflowY: 'auto'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {allLinks.map(link => (
              <Link key={link.path} href={link.path} style={{
                fontSize: '1.125rem',
                fontFamily: 'var(--font-inter)',
                fontWeight: pathname === link.path ? 700 : 500,
                color: pathname === link.path ? 'var(--primary)' : 'var(--on-surface)',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: pathname === link.path ? 'var(--primary-container)' : 'transparent',
                transition: 'all 0.2s ease'
              }}>
                {link.name}
              </Link>
            ))}
            <Link href="/about" style={{
              fontSize: '1.125rem',
              fontFamily: 'var(--font-inter)',
              fontWeight: pathname === '/about' ? 700 : 500,
              color: pathname === '/about' ? 'var(--primary)' : 'var(--on-surface)',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-md)',
              backgroundColor: pathname === '/about' ? 'var(--primary-container)' : 'transparent',
              transition: 'all 0.2s ease'
            }}>
              Our Story
            </Link>
            <div style={{ paddingTop: '1rem', marginTop: '0.5rem', borderTop: '1px solid var(--outline-variant)' }}>
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
          </div>
        </div>
      )}
    </>
  );
}
