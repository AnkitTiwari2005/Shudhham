"use client"
import Link from 'next/link';

export default function Footer() {
  const categories = [
    { name: 'Immunity & Health', path: '/products?category=immunity' },
    { name: 'Mental Wellness', path: '/products?category=mental' },
    { name: 'Skin & Beauty', path: '/products?category=skin' },
    { name: 'Herbal Teas', path: '/products?category=teas' },
  ];

  return (
    <footer style={{ backgroundColor: '#2C3E2F', color: '#FAF8F3', padding: '5rem 0 2rem 0', marginTop: 'auto' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', marginBottom: '4rem' }}>
          
          {/* Brand Column */}
          <div style={{ flex: 2 }}>
            <h2 style={{ fontFamily: 'var(--font-noto-serif)', fontSize: '1.5rem', marginBottom: '1.5rem' }}>Shudhham</h2>
            <p style={{ color: 'rgba(250, 248, 243, 0.7)', lineHeight: 1.7, maxWidth: '300px' }}>
              Rooted in tradition, crafted for purity. Shudhham brings you the finest Ayurvedic remedies for a balanced, holistic lifestyle.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Categories</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {categories.map(cat => (
                <Link key={cat.name} href={cat.path} style={{ color: 'rgba(250, 248, 243, 0.7)', textDecoration: 'none', transition: 'color 0.2s' }}>
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Business Info */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Visit Us</h4>
            <p style={{ color: 'rgba(250, 248, 243, 0.7)', lineHeight: 1.7, marginBottom: '1rem' }}>
              9 Guru Nanak Market, Lajpat Nagar 4,<br />
              New Delhi - 110024
            </p>
            <p style={{ color: 'rgba(250, 248, 243, 0.7)' }}>+91 9811797407</p>
            <p style={{ color: 'rgba(250, 248, 243, 0.7)' }}>shivskukreja@gmail.com</p>
          </div>

          {/* Newsletter */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Newsletter</h4>
            <p style={{ color: 'rgba(250, 248, 243, 0.7)', fontSize: '0.875rem', marginBottom: '1rem' }}>Get wellness tips and product updates.</p>
            <div style={{ display: 'flex', borderBottom: '1px solid rgba(250, 248, 243, 0.3)', paddingBottom: '0.5rem' }}>
              <input type="email" placeholder="Your email" style={{ background: 'none', border: 'none', color: 'white', flex: 1, outline: 'none' }} />
              <button style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontWeight: 600 }}>Join</button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div style={{ borderTop: '1px solid rgba(250, 248, 243, 0.1)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', fontSize: '0.875rem', color: 'rgba(250, 248, 243, 0.5)' }}>
          <p>© 2024 Shudhham E-Commerce. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <Link href="/privacy" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy Policy</Link>
            <Link href="/terms" style={{ color: 'inherit', textDecoration: 'none' }}>Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
