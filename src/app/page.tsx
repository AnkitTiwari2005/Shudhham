import Link from 'next/link';
import { supabase, seedProductsIfEmpty } from '@/lib/supabase';
import ProductCard from '@/components/ProductCard';
import { Leaf, Truck, RotateCcw, FlaskConical, Heart, Droplets, Sun, TreePine, BookOpen, ArrowRight, Microscope, Star } from 'lucide-react';

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
          <span style={{ color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.8125rem', marginBottom: '1.5rem', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            <Leaf size={14} /> The Modern Apothecary <Leaf size={14} />
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
          <div className="grid-half" style={{ alignItems: 'center' }}>
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
              backgroundImage: 'url(https://lh3.googleusercontent.com/aida-public/AB6AXuCrCvAhPu5hVVJ_XDDqj2NQzBAMlqkm0YKmZYiLSr9uZjmQjc2ZdalTtQ9gcMuEHs7h2pk_UQRQS3OyzjZpOM_7r0tYHSekvw8U-9r2Nw_HZsiOadLdh6klpbreFKEyfNqn73CVDtVqYo7so2J3BgRM7vMCtkHxBmXfS8mnJYPoqa8s0rjYrnorPfqUx26kCfCHnYWfdHbPyk9iah2WGyfZzg3NnXv4VAF0UuDYXKGN5o9NRdyMv8Kl6jGkwBmcfQXTCG1rtU_kWfCh)',
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
          
          <div className="grid-products">
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
          <div className="grid-thirds">
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

      {/* ──── Ayurvedic Healing Preview ──── */}
      <section className="section-padding" style={{ backgroundColor: 'var(--surface-container-low)' }}>
        <div className="container">
          <div className="grid-half" style={{ alignItems: 'center' }}>
            <div style={{
              backgroundImage: 'url(/ayurvedic-hero.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              aspectRatio: '4/3',
              borderRadius: 'var(--radius-xl)',
              boxShadow: 'var(--shadow-xl)',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(44,62,47,0.6), transparent)' }} />
              <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem', zIndex: 1 }}>
                <span style={{ backgroundColor: 'var(--accent)', color: 'white', padding: '0.375rem 0.875rem', borderRadius: 'var(--radius-full)', fontSize: '0.6875rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>5,000+ Years of Wisdom</span>
              </div>
            </div>
            <div>
              <span style={{ color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.75rem', fontWeight: 600 }}>Ayurvedic Healing</span>
              <h2 className="heading-headline" style={{ marginTop: '0.75rem', marginBottom: '1.5rem' }}>The Ancient Science of Life & Longevity</h2>
              <p style={{ color: 'var(--on-surface-variant)', lineHeight: 1.7, marginBottom: '2rem' }}>
                Explore Panchakarma detoxification, Abhyanga oil therapy, Shirodhara, and personalized Dosha-based treatments rooted in the Charaka Samhita.
              </p>
              <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                {[
                  { icon: <Droplets size={18} />, label: 'Panchakarma' },
                  { icon: <Sun size={18} />, label: 'Shirodhara' },
                  { icon: <Heart size={18} />, label: 'Abhyanga' },
                ].map((item, i) => (
                  <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--primary)', fontWeight: 500 }}>
                    {item.icon} {item.label}
                  </span>
                ))}
              </div>
              <Link href="/ayurveda" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: 600, fontSize: '0.9375rem' }}>
                Explore Ayurvedic Treatments <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ──── Naturopathy Preview ──── */}
      <section className="section-padding">
        <div className="container">
          <div className="grid-half" style={{ alignItems: 'center' }}>
            <div style={{ order: 1 }}>
              <span style={{ color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.75rem', fontWeight: 600 }}>Naturopathy</span>
              <h2 className="heading-headline" style={{ marginTop: '0.75rem', marginBottom: '1.5rem' }}>Heal with the Five Elements of Nature</h2>
              <p style={{ color: 'var(--on-surface-variant)', lineHeight: 1.7, marginBottom: '2rem' }}>
                Discover hydrotherapy, mud therapy, diet therapy, and more — natural modalities that activate your body&apos;s innate healing power without side effects.
              </p>
              <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                {[
                  { icon: <Droplets size={18} />, label: 'Hydrotherapy' },
                  { icon: <TreePine size={18} />, label: 'Mud Therapy' },
                  { icon: <Sun size={18} />, label: 'Heliotherapy' },
                ].map((item, i) => (
                  <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--primary)', fontWeight: 500 }}>
                    {item.icon} {item.label}
                  </span>
                ))}
              </div>
              <Link href="/naturopathy" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: 600, fontSize: '0.9375rem' }}>
                Explore Naturopathy Treatments <ArrowRight size={16} />
              </Link>
            </div>
            <div style={{
              backgroundImage: 'url(/naturopathy-hero.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              aspectRatio: '4/3',
              borderRadius: 'var(--radius-xl)',
              boxShadow: 'var(--shadow-xl)',
              position: 'relative',
              overflow: 'hidden',
              order: 0,
            }}>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(44,62,47,0.6), transparent)' }} />
              <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem', zIndex: 1 }}>
                <span style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '0.375rem 0.875rem', borderRadius: 'var(--radius-full)', fontSize: '0.6875rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Zero Side Effects</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──── Medicinal Research Preview ──── */}
      <section style={{
        backgroundImage: 'url(/research-hero.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(44,62,47,0.85), rgba(30,40,32,0.9))' }} />
        <div className="container section-padding" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
            <span style={{ color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.75rem', fontWeight: 600, display: 'block', marginBottom: '1rem' }}>Evidence-Based Healing</span>
            <h2 className="heading-headline" style={{ color: 'white', marginBottom: '1.5rem' }}>Medicinal Research & Clinical Studies</h2>
            <p style={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.7, marginBottom: '2rem', fontSize: '1.0625rem' }}>
              Explore peer-reviewed research validating Ayurvedic compounds, naturopathic therapies, and the science behind traditional healing systems.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '2.5rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
              {[
                { icon: <BookOpen size={20} />, num: '2,400+', label: 'Studies' },
                { icon: <Microscope size={20} />, num: '180+', label: 'Clinical Trials' },
                { icon: <FlaskConical size={20} />, num: '50+', label: 'Institutions' },
              ].map((stat, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem', color: 'white' }}>
                  <div style={{ color: 'var(--accent)', marginBottom: '0.25rem' }}>{stat.icon}</div>
                  <span style={{ fontFamily: 'var(--font-noto-serif)', fontSize: '1.5rem', fontWeight: 700 }}>{stat.num}</span>
                  <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.65)' }}>{stat.label}</span>
                </div>
              ))}
            </div>
            <Link href="/research" className="btn-primary" style={{ padding: '1rem 2.5rem' }}>
              Browse Research <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
      <section className="section-padding" style={{ backgroundColor: 'var(--primary)', color: 'white' }}>
        <div className="container text-center">
          <h2 className="heading-headline" style={{ color: 'white', marginBottom: '3rem' }}>What Our Community Says</h2>
          <div className="grid-thirds">
            {[
              { name: 'Priya M.', text: 'The Ashwagandha powder has completely transformed my energy levels. Best quality I\'ve found anywhere.', rating: 5 },
              { name: 'Rohan K.', text: 'Finally, an Ayurvedic brand that doesn\'t compromise. The Golden Milk is my evening ritual now.', rating: 5 },
              { name: 'Sneha D.', text: 'The Saffron Glow face oil is liquid gold! My skin has never looked better. Absolutely love it.', rating: 5 }
            ].map((t, i) => (
              <div key={i} style={{ padding: '2rem', borderRadius: 'var(--radius-lg)', backgroundColor: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(10px)', textAlign: 'left' }}>
                <div style={{ color: 'var(--accent)', marginBottom: '1rem', display: 'flex', gap: '2px' }}>{Array.from({ length: t.rating }).map((_, si) => <Star key={si} size={16} fill="currentColor" />)}</div>
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
