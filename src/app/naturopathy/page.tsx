import Link from 'next/link';
import { Metadata } from 'next';
import { Droplets, Sun, TreePine, Apple, Waves, Wind, Footprints, Sprout, Eye, Zap, ArrowRight, Flower2, Globe, Flame, Sparkles, Leaf, CheckCircle2, XCircle, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Naturopathy Treatments | Shudhham',
  description: 'Explore holistic Naturopathy treatments including hydrotherapy, mud therapy, diet therapy, and more at Shudhham. Heal naturally with the power of nature.',
};

const therapies = [
  {
    icon: <Droplets size={28} />,
    title: 'Hydrotherapy',
    subtitle: 'Water-Based Healing',
    desc: 'Therapeutic use of water at varying temperatures and pressures to stimulate blood circulation, boost immunity, and facilitate toxin elimination. Includes hip baths, spinal baths, steam baths, and immersion therapies.',
    approach: 'External',
    conditions: ['Arthritis', 'Chronic fatigue', 'Circulatory issues']
  },
  {
    icon: <TreePine size={28} />,
    title: 'Mud Therapy',
    subtitle: 'Earth Element Healing',
    desc: 'Application of natural, mineral-rich mud packs on specific body parts to cool inflammation, absorb toxins from the skin, improve complexion, and relieve pain. The earth element grounds and stabilizes Vata imbalances.',
    approach: 'External',
    conditions: ['Skin disorders', 'Inflammation', 'Eye strain']
  },
  {
    icon: <Apple size={28} />,
    title: 'Diet Therapy',
    subtitle: 'Food as Medicine',
    desc: 'A carefully designed elimination and therapeutic diet protocol based on your constitution, health condition, and digestive capacity. Embraces raw foods, juice fasting, intermittent fasting, and alkaline nutrition.',
    approach: 'Internal',
    conditions: ['Obesity', 'Diabetes', 'Digestive disorders']
  },
  {
    icon: <Sun size={28} />,
    title: 'Heliotherapy',
    subtitle: 'Chromotherapy & Sunlight',
    desc: 'Controlled exposure to natural sunlight and color-filtered light to regulate circadian rhythms, improve Vitamin D synthesis, address skin conditions, and enhance mood through the visible spectrum.',
    approach: 'External',
    conditions: ['Depression', 'Vitamin D deficiency', 'Psoriasis']
  },
  {
    icon: <Wind size={28} />,
    title: 'Air Therapy',
    subtitle: 'Pranayama & Open-Air Exposure',
    desc: 'Therapeutic breathing exercises (pranayama), open-air baths, and high-altitude air exposure to increase oxygenation, strengthen respiratory function, and calm the autonomic nervous system.',
    approach: 'Internal / External',
    conditions: ['Asthma', 'Anxiety', 'COPD']
  },
  {
    icon: <Zap size={28} />,
    title: 'Magnetotherapy',
    subtitle: 'Bio-Magnetic Healing',
    desc: 'Application of magnetic fields to specific body regions to accelerate cellular repair, reduce inflammation, improve blood flow, and stimulate the body\'s natural electromagnetic balance.',
    approach: 'External',
    conditions: ['Joint pain', 'Fracture healing', 'Insomnia']
  },
  {
    icon: <Footprints size={28} />,
    title: 'Reflexology',
    subtitle: 'Pressure Point Mapping',
    desc: 'Applying targeted pressure to specific reflex points on the feet, hands, and ears that correspond to internal organs and body systems. Restores energy flow and promotes systemic healing.',
    approach: 'External',
    conditions: ['Migraine', 'Hormonal imbalance', 'Digestive issues']
  },
  {
    icon: <Flower2 size={28} />,
    title: 'Acupressure',
    subtitle: 'Meridian Energy Work',
    desc: 'Stimulating vital energy points (marma/acupoints) along the body\'s meridian channels to unblock stagnant energy, relieve pain, and restore the free flow of Prana (life force).',
    approach: 'External',
    conditions: ['Chronic pain', 'Stress', 'Nausea']
  },
];

const principles = [
  {
    icon: <Sprout size={24} />,
    title: 'Vis Medicatrix Naturae',
    desc: 'The healing power of nature. The body possesses an inherent ability to heal itself given the right conditions and support.'
  },
  {
    icon: <Eye size={24} />,
    title: 'Tolle Causam',
    desc: 'Identify and treat the root cause. Rather than suppressing symptoms, naturopathy seeks to discover and address the underlying cause of disease.'
  },
  {
    icon: <Waves size={24} />,
    title: 'Primum Non Nocere',
    desc: 'First, do no harm. Utilize the least invasive, most natural therapies that minimize the risk of adverse effects and support the body\'s natural processes.'
  },
  {
    icon: <Sun size={24} />,
    title: 'Docere',
    desc: 'The practitioner as teacher. Educate patients in self-care, preventive practices, and healthy lifestyle choices that empower lifelong wellness.'
  },
];

const fiveElements = [
  { element: 'Earth (Prithvi)', therapy: 'Mud Therapy', color: '#8B6914', icon: <Globe size={32} />, desc: 'Grounding, cooling, and detoxifying. Draws out impurities and stabilizes the body.' },
  { element: 'Water (Jala)', therapy: 'Hydrotherapy', color: '#4A90B8', icon: <Droplets size={32} />, desc: 'Purifying and adaptive. Water cleanses, soothes, and stimulates vital processes.' },
  { element: 'Fire (Agni)', therapy: 'Heliotherapy', color: '#D4874D', icon: <Flame size={32} />, desc: 'Energizing and transformative. Sunlight activates healing and metabolic processes.' },
  { element: 'Air (Vayu)', therapy: 'Air Therapy', color: '#7B9ECE', icon: <Wind size={32} />, desc: 'Oxygenating and calming. Breath work restores nervous system balance.' },
  { element: 'Ether (Akasha)', therapy: 'Fasting Therapy', color: '#9B7EC8', icon: <Sparkles size={32} />, desc: 'Creating space. Periodic fasting allows the body to rest, detox, and regenerate.' },
];

export default function NaturopathyPage() {
  return (
    <div>
      {/* Hero */}
      <section style={{
        backgroundImage: 'url(/naturopathy-hero.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(44,62,47,0.55), rgba(44,62,47,0.75))' }} />
        <div style={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          maxWidth: '800px',
          padding: '3rem var(--page-gutter)',
        }}>
          <span style={{ color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.25em', fontSize: '0.75rem', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <Leaf size={14} /> Nature&apos;s Own Pharmacy <Leaf size={14} />
          </span>
          <h1 className="heading-display" style={{ color: '#ffffff', marginBottom: '1.5rem' }}>
            Naturopathy Treatments
          </h1>
          <p style={{ fontSize: '1.125rem', color: 'rgba(255,255,255,0.9)', lineHeight: 1.7, maxWidth: '600px', margin: '0 auto 2.5rem auto' }}>
            Harnessing the five elements of nature — Earth, Water, Fire, Air, and Ether — to activate the body&apos;s innate healing intelligence and restore homeostasis.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/products" className="btn-primary" style={{ padding: '1rem 2.5rem' }}>Shop Natural Remedies</Link>
            <Link href="/contact" style={{ padding: '1rem 2.5rem', border: '1.5px solid rgba(255,255,255,0.7)', color: 'white', borderRadius: 'var(--radius-full)', fontWeight: 500, fontSize: '0.9375rem', transition: 'all 0.2s' }}>Book a Session</Link>
          </div>
        </div>
      </section>

      {/* Core Principles */}
      <section className="section-padding">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span style={{ color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.75rem', fontWeight: 600 }}>Foundation</span>
            <h2 className="heading-headline" style={{ marginTop: '0.75rem', marginBottom: '1rem' }}>Core Principles of Naturopathy</h2>
            <p style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--on-surface-variant)', lineHeight: 1.7 }}>
              Naturopathy is built upon timeless principles that honour the body&apos;s wisdom and nature&apos;s capacity to heal.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {principles.map((p, i) => (
              <div key={i} style={{
                padding: '2.5rem 2rem',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'var(--surface-container-low)',
                borderLeft: '4px solid var(--primary)',
                transition: 'all 0.3s ease'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <div style={{ color: 'var(--primary)' }}>{p.icon}</div>
                  <h3 style={{ fontFamily: 'var(--font-noto-serif)', fontSize: '1.125rem', fontWeight: 600, fontStyle: 'italic' }}>{p.title}</h3>
                </div>
                <p style={{ color: 'var(--on-surface-variant)', fontSize: '0.9375rem', lineHeight: 1.65 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Five Elements */}
      <section className="section-padding" style={{ backgroundColor: 'var(--surface-container-low)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span style={{ color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.75rem', fontWeight: 600 }}>Pancha Mahabhuta</span>
            <h2 className="heading-headline" style={{ marginTop: '0.75rem' }}>Healing Through the Five Elements</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.25rem' }}>
            {fiveElements.map((e, i) => (
              <div key={i} style={{
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                backgroundColor: 'var(--surface)',
                boxShadow: 'var(--shadow-md)',
                transition: 'all 0.3s ease',
                textAlign: 'center',
              }}>
                <div style={{ background: `linear-gradient(135deg, ${e.color}, ${e.color}cc)`, padding: '2rem 1rem', color: 'white' }}>
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.5rem' }}>{e.icon}</div>
                  <h3 style={{ fontFamily: 'var(--font-noto-serif)', fontSize: '1rem', fontWeight: 600 }}>{e.element}</h3>
                </div>
                <div style={{ padding: '1.5rem 1.25rem' }}>
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent)', fontWeight: 600, display: 'block', marginBottom: '0.75rem' }}>{e.therapy}</span>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--on-surface-variant)', lineHeight: 1.6 }}>{e.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Therapies Grid */}
      <section className="section-padding">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span style={{ color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.75rem', fontWeight: 600 }}>Therapeutic Modalities</span>
            <h2 className="heading-headline" style={{ marginTop: '0.75rem' }}>Our Naturopathy Treatments</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.5rem' }}>
            {therapies.map((t, i) => (
              <div key={i} className="card" style={{ padding: '2.5rem 2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    width: '52px', height: '52px', borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--primary-container)', color: 'var(--primary)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                  }}>
                    {t.icon}
                  </div>
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-noto-serif)', fontSize: '1.25rem', fontWeight: 600 }}>{t.title}</h3>
                    <span style={{ fontSize: '0.8125rem', color: 'var(--accent)', fontWeight: 500 }}>{t.subtitle}</span>
                  </div>
                </div>
                <p style={{ color: 'var(--on-surface-variant)', fontSize: '0.9375rem', lineHeight: 1.65, flex: 1 }}>{t.desc}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid var(--outline-variant)', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <span style={{ fontSize: '0.8125rem', color: 'var(--on-surface-variant)', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: '0.375rem' }}><Zap size={14} /> {t.approach}</span>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                    {t.conditions.map((c, j) => (
                      <span key={j} style={{
                        fontSize: '0.6875rem', padding: '0.25rem 0.625rem',
                        backgroundColor: 'var(--secondary-container)', borderRadius: 'var(--radius-full)',
                        color: 'var(--primary)', fontWeight: 600
                      }}>{c}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Banner */}
      <section className="section-padding" style={{ backgroundColor: 'var(--primary)', color: 'white', textAlign: 'center' }}>
        <div className="container">
          <h2 className="heading-headline" style={{ color: 'white', marginBottom: '1.5rem' }}>Naturopathy vs Conventional Approach</h2>
          <div className="grid-half" style={{ maxWidth: '900px', margin: '0 auto', gap: '0' }}>
            <div style={{ padding: '2.5rem 2rem', backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 'var(--radius-lg) 0 0 var(--radius-lg)', borderRight: '1px solid rgba(255,255,255,0.1)' }}>
              <h3 style={{ fontFamily: 'var(--font-noto-serif)', fontSize: '1.25rem', marginBottom: '1.5rem', color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Leaf size={20} /> Naturopathy</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left', fontSize: '0.9375rem', color: 'rgba(255,255,255,0.85)', lineHeight: 1.6 }}>
                <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={16} style={{ flexShrink: 0, color: 'var(--accent)' }} /> Treats root cause of disease</p>
                <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={16} style={{ flexShrink: 0, color: 'var(--accent)' }} /> Strengthens the immune system</p>
                <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={16} style={{ flexShrink: 0, color: 'var(--accent)' }} /> Zero side effects</p>
                <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={16} style={{ flexShrink: 0, color: 'var(--accent)' }} /> Personalized holistic approach</p>
                <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={16} style={{ flexShrink: 0, color: 'var(--accent)' }} /> Preventive and restorative</p>
              </div>
            </div>
            <div style={{ padding: '2.5rem 2rem', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '0 var(--radius-lg) var(--radius-lg) 0' }}>
              <h3 style={{ fontFamily: 'var(--font-noto-serif)', fontSize: '1.25rem', marginBottom: '1.5rem', color: 'rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Clock size={20} /> Conventional</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left', fontSize: '0.9375rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>
                <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><XCircle size={16} style={{ flexShrink: 0, opacity: 0.6 }} /> Manages symptoms primarily</p>
                <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><XCircle size={16} style={{ flexShrink: 0, opacity: 0.6 }} /> Can suppress immunity</p>
                <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><XCircle size={16} style={{ flexShrink: 0, opacity: 0.6 }} /> Potential side effects</p>
                <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><XCircle size={16} style={{ flexShrink: 0, opacity: 0.6 }} /> Standardized protocols</p>
                <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><XCircle size={16} style={{ flexShrink: 0, opacity: 0.6 }} /> Often reactive approach</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding" style={{ textAlign: 'center' }}>
        <div className="container">
          <span style={{ color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.75rem', fontWeight: 600, display: 'block', marginBottom: '1rem' }}>Embrace Natural Healing</span>
          <h2 className="heading-headline" style={{ marginBottom: '1rem' }}>Let Nature Be Your Medicine</h2>
          <p style={{ color: 'var(--on-surface-variant)', maxWidth: '500px', margin: '0 auto 2rem auto', lineHeight: 1.7 }}>
            Explore our range of natural wellness products or read our latest research on evidence-based natural medicine.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/products" className="btn-primary" style={{ padding: '1rem 2.5rem' }}>Shop Natural Products</Link>
            <Link href="/research" className="btn-secondary" style={{ padding: '1rem 2.5rem' }}>
              Medicinal Research <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
