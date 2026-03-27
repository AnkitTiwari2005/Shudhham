import Link from 'next/link';
import { Metadata } from 'next';
import { Leaf, Handshake, FlaskConical } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Story | Shudhham',
  description: 'Learn about Shudhham, our philosophy, and our commitment to pure, natural wellness.',
};

export default function AboutPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="section-padding" style={{ backgroundColor: 'var(--surface-container-low)' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <span style={{ color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.75rem', marginBottom: '1rem', display: 'block', fontWeight: 600 }}>
            Our Heritage
          </span>
          <h1 className="heading-display" style={{ marginBottom: '1.5rem' }}>
            Rooted in Tradition. Crafted for Today.
          </h1>
          <p style={{ fontSize: '1.125rem', color: 'var(--on-surface-variant)', lineHeight: 1.7 }}>
            Shudhham was born from a simple realization: in our fast-paced modern world, we have lost touch with the healing power of pure, unadulterated nature.
          </p>
        </div>
      </section>

      {/* Story Content */}
      <section className="section-padding">
        <div className="container">
          <div className="grid-half" style={{ alignItems: 'center' }}>
            <div style={{ 
              aspectRatio: '3/4', 
              borderRadius: 'var(--radius-xl)',
              backgroundImage: 'url(https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=800&auto=format&fit=crop)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              boxShadow: 'var(--shadow-xl)'
            }} />
            
            <div>
              <h2 className="heading-headline" style={{ marginBottom: '2rem' }}>The Journey Back to Source</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', color: 'var(--on-surface-variant)', lineHeight: 1.7, fontSize: '1.0625rem' }}>
                <p>
                  What began as a personal quest for authentic Ayurvedic remedies quickly evolved into a broader mission. We traveled across the subcontinent, from the foothills of the Himalayas to the fertile plains of the south, seeking farmers and cultivators who still adhered to ethical, traditional growing practices.
                </p>
                <p>
                  Our name, &quot;Shudhham&quot;, translates to absolute purity. It is not just our brand; it is our exacting standard. We source only the finest botanicals, ensuring they are minimally processed to retain their vital properties.
                </p>
                <p>
                  We believe that wellness is not a destination, but a daily practice of alignment. Our apothecary is curated to support that practice, offering remedies that nourish the body, calm the mind, and restore balance.
                </p>
              </div>

              <div style={{ marginTop: '3rem' }}>
                <Link href="/products" className="btn-primary" style={{ padding: '1rem 2.5rem' }}>Explore the Apothecary</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding" style={{ backgroundColor: 'var(--primary)', color: 'white', textAlign: 'center' }}>
        <div className="container">
          <span style={{ display: 'block', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.75rem', fontWeight: 600, marginBottom: '1rem' }}>The standard</span>
          <h2 className="heading-headline" style={{ color: 'white', marginBottom: '4rem' }}>Our Guiding Principles</h2>
          
          <div className="grid-thirds" style={{ gap: '3rem' }}>
            <div style={{ padding: '2rem', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius-lg)' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem', color: 'var(--accent)' }}><Leaf size={32} /></div>
              <h3 className="heading-title" style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Absolute Purity</h3>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9375rem', lineHeight: 1.6 }}>No fillers, no artificial additives, no compromises. Only potent, natural botanicals.</p>
            </div>
            <div style={{ padding: '2rem', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius-lg)' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem', color: 'var(--accent)' }}><Handshake size={32} /></div>
              <h3 className="heading-title" style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Ethical Sourcing</h3>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9375rem', lineHeight: 1.6 }}>We partner directly with farmers who prioritize regenerative agriculture and fair labor.</p>
            </div>
            <div style={{ padding: '2rem', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius-lg)' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem', color: 'var(--accent)' }}><FlaskConical size={32} /></div>
              <h3 className="heading-title" style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Rigorous Testing</h3>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9375rem', lineHeight: 1.6 }}>Every batch is tested for potency, heavy metals, and purity before it reaches you.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
