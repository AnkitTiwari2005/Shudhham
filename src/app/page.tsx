import Link from 'next/link';
import { supabase, seedProductsIfEmpty } from '@/lib/supabase';
import ProductCard from '@/components/ProductCard';
import { Leaf, Truck, RotateCcw, FlaskConical, Heart } from 'lucide-react';

export const revalidate = 0;

export default async function HomePage() {
  await seedProductsIfEmpty();

  const { data: featuredProducts } = await supabase
    .from('products')
    .select('*')
    .limit(8);

  return (
    <div>
      {/* Hero Section */}
      <section className="section-padding" style={{ 
        backgroundImage: 'url(/hero-bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        minHeight: '85vh',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Light overlay — keeps image vivid */}
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.2)' }} />
        
        {/* Frosted glass card */}
        <div style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          background: 'rgba(44, 62, 47, 0.55)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderRadius: '1.5rem',
          border: '1px solid rgba(255,255,255,0.15)',
          padding: '3rem 3.5rem',
          maxWidth: '700px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
        }}>
          <span style={{ color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.8125rem', marginBottom: '1.5rem', fontWeight: 600 }}>
            ✦ The Modern Apothecary ✦
          </span>
          <h1 className="heading-display" style={{ maxWidth: '600px', marginBottom: '1.25rem', color: '#ffffff' }}>
            Pure, Intentional Wellness Rooted in Tradition.
          </h1>
          <p style={{ fontSize: '1.0625rem', color: 'rgba(255,255,255,0.9)', maxWidth: '500px', marginBottom: '2.5rem', lineHeight: 1.7 }}>
            Discover our curated collection of organic botanicals, adaptogens, and traditional remedies designed for the modern lifestyle.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link href="/products" className="btn-primary" style={{ padding: '1rem 2.5rem' }}>Shop Collection</Link>
            <Link href="/about" style={{ padding: '1rem 2.5rem', border: '1.5px solid rgba(255,255,255,0.7)', color: 'white', borderRadius: 'var(--radius-full)', fontWeight: 500, fontSize: '0.9375rem', transition: 'all 0.2s' }}>Our Philosophy</Link>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section style={{ borderBottom: '1px solid var(--outline-variant)', padding: '2rem var(--page-gutter)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap', fontSize: '0.8125rem', color: 'var(--on-surface-variant)', fontWeight: 500 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Leaf size={16} /> 100% Organic</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Truck size={16} /> Free Shipping over ₹499</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><RotateCcw size={16} /> 30-Day Returns</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FlaskConical size={16} /> Lab Tested</span>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="section-padding">
        <div className="container">
          <div className="responsive-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
            <div>
              <span style={{ color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.75rem', fontWeight: 600 }}>Our Philosophy</span>
              <h2 className="heading-headline" style={{ marginTop: '0.75rem', marginBottom: '1.5rem' }}>We believe the purest medicine comes straight from the earth.</h2>
              <p style={{ color: 'var(--on-surface-variant)', lineHeight: 1.7 }}>
                At Shudhham, we reject the notion of compromised quality. Every leaf, root, and extract in our apothecary is ethically sourced, rigorously tested, and presented without artificial fillers.
              </p>
              <Link href="/about" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: 600, marginTop: '2rem', fontSize: '0.9375rem' }}>
                Read Our Story →
              </Link>
            </div>
            <div style={{ 
              aspectRatio: '4/3', 
              borderRadius: 'var(--radius-xl)',
              backgroundImage: 'url(https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=800&auto=format&fit=crop)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              boxShadow: 'var(--shadow-xl)'
            }} />
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-padding" style={{ backgroundColor: 'var(--surface-container-low)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span style={{ color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.75rem', fontWeight: 600 }}>Curated</span>
              <h2 className="heading-headline" style={{ marginTop: '0.5rem' }}>Featured Apothecary</h2>
            </div>
            <Link href="/products" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: '4px' }}>View All →</Link>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.5rem' }}>
            {featuredProducts?.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Shudhham */}
      <section className="section-padding">
        <div className="container text-center">
          <span style={{ color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.75rem', fontWeight: 600 }}>Why Shudhham</span>
          <h2 className="heading-headline" style={{ marginTop: '0.75rem', marginBottom: '4rem' }}>Nature&apos;s Best, Delivered to You</h2>
          <div className="responsive-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
            {[
              { icon: <Leaf size={32} />, title: 'Farm to Shelf', desc: 'Direct partnerships with 500+ organic farms across India ensure freshness and fair trade.' },
              { icon: <FlaskConical size={32} />, title: 'Lab Certified', desc: 'Every batch undergoes rigorous third-party testing for potency, heavy metals, and purity.' },
              { icon: <Heart size={32} />, title: 'Zero Compromise', desc: 'No fillers, no artificial colors, no preservatives. Just pure, potent botanicals.' }
            ].map((item, i) => (
              <div key={i} style={{ padding: '2.5rem 2rem', borderRadius: 'var(--radius-lg)', backgroundColor: 'var(--surface-container-low)', textAlign: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem', color: 'var(--primary)' }}>{item.icon}</div>
                <h3 style={{ fontFamily: 'var(--font-noto-serif)', fontSize: '1.25rem', marginBottom: '0.75rem' }}>{item.title}</h3>
                <p style={{ color: 'var(--on-surface-variant)', fontSize: '0.875rem', lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding" style={{ backgroundColor: 'var(--primary)', color: 'white' }}>
        <div className="container text-center">
          <h2 className="heading-headline" style={{ color: 'white', marginBottom: '3rem' }}>What Our Community Says</h2>
          <div className="responsive-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
            {[
              { name: 'Priya M.', text: 'The Ashwagandha powder has completely transformed my energy levels. Best quality I\'ve found anywhere.', rating: 5 },
              { name: 'Rohan K.', text: 'Finally, an Ayurvedic brand that doesn\'t compromise. The Golden Milk is my evening ritual now.', rating: 5 },
              { name: 'Sneha D.', text: 'The Saffron Glow face oil is liquid gold! My skin has never looked better. Absolutely love it.', rating: 5 }
            ].map((t, i) => (
              <div key={i} style={{ padding: '2rem', borderRadius: 'var(--radius-lg)', backgroundColor: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(10px)', textAlign: 'left' }}>
                <div style={{ color: 'var(--accent)', marginBottom: '1rem', letterSpacing: '2px' }}>{'★'.repeat(t.rating)}</div>
                <p style={{ fontSize: '0.9375rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.9)', marginBottom: '1.5rem' }}>&quot;{t.text}&quot;</p>
                <p style={{ fontWeight: 600, fontSize: '0.875rem' }}>— {t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding" style={{ textAlign: 'center' }}>
        <div className="container">
          <h2 className="heading-headline" style={{ marginBottom: '1rem' }}>Begin Your Wellness Journey</h2>
          <p style={{ color: 'var(--on-surface-variant)', maxWidth: '500px', margin: '0 auto 2rem auto' }}>
            Join thousands who have embraced purity. Subscribe for exclusive offers and wellness guidance.
          </p>
          <Link href="/products" className="btn-primary" style={{ padding: '1rem 3rem' }}>Explore Collection</Link>
        </div>
      </section>
    </div>
  );
}
