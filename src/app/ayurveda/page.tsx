import Link from 'next/link';
import { Metadata } from 'next';
import { Leaf, Droplets, Flame, Wind, Sun, Moon, Heart, Shield, Brain, Sparkles, ArrowRight, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Ayurvedic Treatments | Shudhham',
  description: 'Discover authentic Ayurvedic treatments, Panchakarma therapies, and holistic healing wisdom rooted in 5,000 years of tradition at Shudhham.',
};

const treatments = [
  {
    icon: <Droplets size={28} />,
    title: 'Panchakarma',
    subtitle: 'Five-fold Purification',
    desc: 'A comprehensive detoxification program that cleanses the body of accumulated toxins (ama) through five therapeutic procedures — Vamana, Virechana, Basti, Nasya, and Raktamokshana.',
    duration: '7–21 days',
    benefits: ['Deep detoxification', 'Metabolic reset', 'Immune restoration']
  },
  {
    icon: <Flame size={28} />,
    title: 'Abhyanga',
    subtitle: 'Warm Oil Massage',
    desc: 'A full-body warm herbal oil massage that nourishes the skin, calms the nervous system, and improves lymphatic drainage. Customized oils are selected based on your Dosha constitution.',
    duration: '60–90 min',
    benefits: ['Stress relief', 'Joint flexibility', 'Skin nourishment']
  },
  {
    icon: <Sun size={28} />,
    title: 'Shirodhara',
    subtitle: 'Third Eye Oil Flow',
    desc: 'A continuous stream of warm medicated oil is poured onto the forehead (Ajna chakra), inducing a profound state of calm. Highly effective for anxiety, insomnia, and neurological conditions.',
    duration: '45–60 min',
    benefits: ['Mental clarity', 'Deep relaxation', 'Sleep improvement']
  },
  {
    icon: <Wind size={28} />,
    title: 'Nasya',
    subtitle: 'Nasal Therapy',
    desc: 'Medicated oils or herbal preparations administered through the nasal passages to cleanse the sinuses, sharpen the senses, and address conditions of the head and neck region.',
    duration: '30 min',
    benefits: ['Sinus relief', 'Mental alertness', 'Headache relief']
  },
  {
    icon: <Shield size={28} />,
    title: 'Swedana',
    subtitle: 'Herbal Steam Therapy',
    desc: 'A therapeutic steam bath infused with healing herbs that opens the pores, dilates channels, and facilitates the removal of deep-seated toxins from the body tissues.',
    duration: '20–30 min',
    benefits: ['Toxin elimination', 'Pain relief', 'Improved circulation']
  },
  {
    icon: <Heart size={28} />,
    title: 'Pizhichil',
    subtitle: 'Royal Oil Bath',
    desc: 'Known as the "treatment of aristocrats," warm medicated oil is continuously squeezed over the body by trained therapists while simultaneously massaging. Deeply rejuvenating.',
    duration: '60–90 min',
    benefits: ['Anti-aging', 'Muscle recovery', 'Deep nourishment']
  },
];

const doshas = [
  {
    name: 'Vata',
    element: 'Air + Ether',
    color: '#7B9ECE',
    traits: 'Creative, energetic, quick-thinking',
    imbalance: 'Anxiety, dry skin, insomnia, bloating',
    remedies: 'Warm foods, Abhyanga, grounding practices'
  },
  {
    name: 'Pitta',
    element: 'Fire + Water',
    color: '#D4874D',
    traits: 'Focused, ambitious, sharp intellect',
    imbalance: 'Inflammation, acidity, irritability, rashes',
    remedies: 'Cooling herbs, Shirodhara, moon bathing'
  },
  {
    name: 'Kapha',
    element: 'Earth + Water',
    color: '#6B9B7C',
    traits: 'Calm, compassionate, steady',
    imbalance: 'Congestion, weight gain, lethargy, depression',
    remedies: 'Dry massage, Swedana, invigorating spices'
  },
];

const dinacharya = [
  { time: '5:30 AM', ritual: 'Brahma Muhurta', desc: 'Wake during the auspicious pre-dawn hours when Sattva (purity) is at its peak.', icon: <Moon size={20} /> },
  { time: '6:00 AM', ritual: 'Gandusha & Danta Dhavana', desc: 'Oil pulling with sesame oil followed by herbal tooth cleaning with neem or charcoal.', icon: <Sparkles size={20} /> },
  { time: '6:15 AM', ritual: 'Abhyanga & Snana', desc: 'Self-massage with warm Dosha-appropriate oil, followed by a warm water bath.', icon: <Droplets size={20} /> },
  { time: '6:45 AM', ritual: 'Pranayama & Dhyana', desc: 'Breathing exercises and meditation to set intention and mental clarity for the day.', icon: <Wind size={20} /> },
  { time: '7:30 AM', ritual: 'Ahara (Nourishment)', desc: 'A warm, cooked breakfast aligned with the season and your Prakriti constitution.', icon: <Flame size={20} /> },
  { time: '9:00 PM', ritual: 'Pada Abhyanga', desc: 'Foot massage with warm ghee or oil to calm the nervous system before sleep.', icon: <Heart size={20} /> },
];

export default function AyurvedaPage() {
  return (
    <div>
      {/* Hero Section */}
      <section style={{
        backgroundImage: 'url(/ayurvedic-hero.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(44,62,47,0.6), rgba(44,62,47,0.8))' }} />
        <div style={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          maxWidth: '800px',
          padding: '3rem var(--page-gutter)',
        }}>
          <span style={{ color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.25em', fontSize: '0.75rem', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <Leaf size={14} /> Ancient Wisdom, Modern Healing <Leaf size={14} />
          </span>
          <h1 className="heading-display" style={{ color: '#ffffff', marginBottom: '1.5rem' }}>
            Ayurvedic Treatments
          </h1>
          <p style={{ fontSize: '1.125rem', color: 'rgba(255,255,255,0.9)', lineHeight: 1.7, maxWidth: '600px', margin: '0 auto 2.5rem auto' }}>
            Rooted in 5,000 years of Vedic science, Ayurveda offers a profound system of natural healing that restores balance between body, mind, and consciousness.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/products" className="btn-primary" style={{ padding: '1rem 2.5rem' }}>Shop Ayurvedic Remedies</Link>
            <Link href="/contact" style={{ padding: '1rem 2.5rem', border: '1.5px solid rgba(255,255,255,0.7)', color: 'white', borderRadius: 'var(--radius-full)', fontWeight: 500, fontSize: '0.9375rem', transition: 'all 0.2s' }}>Book Consultation</Link>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="section-padding">
        <div className="container">
          <div className="grid-half" style={{ alignItems: 'center' }}>
            <div>
              <span style={{ color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.75rem', fontWeight: 600 }}>The Science of Life</span>
              <h2 className="heading-headline" style={{ marginTop: '0.75rem', marginBottom: '1.5rem' }}>Ayurveda: आयुर्वेद</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', color: 'var(--on-surface-variant)', lineHeight: 1.7 }}>
                <p>
                  Ayurveda, meaning "The Science of Life" in Sanskrit, is humanity&apos;s oldest continuously practiced medical system. Originating from the Atharva Veda over 5,000 years ago, it views health not as the mere absence of disease, but as a dynamic state of equilibrium between the Doshas (bio-energies), Dhatus (tissues), and Malas (waste products).
                </p>
                <p>
                  Unlike conventional medicine that treats symptoms, Ayurveda addresses the root cause of imbalance through personalized dietary guidance, herbal formulations, lifestyle modifications, and therapeutic treatments tailored to your unique Prakriti (constitution).
                </p>
              </div>
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem',
            }}>
              {[
                { num: '5,000+', label: 'Years of Tradition' },
                { num: '700+', label: 'Medicinal Herbs' },
                { num: '8', label: 'Branches of Healing' },
                { num: '3', label: 'Bio-Energies (Doshas)' },
              ].map((stat, i) => (
                <div key={i} style={{
                  padding: '2rem 1.5rem',
                  backgroundColor: 'var(--surface-container-low)',
                  borderRadius: 'var(--radius-lg)',
                  textAlign: 'center'
                }}>
                  <div style={{ fontFamily: 'var(--font-noto-serif)', fontSize: '2rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '0.5rem' }}>{stat.num}</div>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--on-surface-variant)', fontWeight: 500 }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Treatments Grid */}
      <section className="section-padding" style={{ backgroundColor: 'var(--surface-container-low)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span style={{ color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.75rem', fontWeight: 600 }}>Therapeutic Offerings</span>
            <h2 className="heading-headline" style={{ marginTop: '0.75rem' }}>Classical Ayurvedic Therapies</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '1.5rem' }}>
            {treatments.map((t, i) => (
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
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid var(--outline-variant)' }}>
                  <span style={{ fontSize: '0.8125rem', color: 'var(--on-surface-variant)', display: 'inline-flex', alignItems: 'center', gap: '0.375rem' }}><Clock size={14} /> {t.duration}</span>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                    {t.benefits.map((b, j) => (
                      <span key={j} style={{
                        fontSize: '0.6875rem', padding: '0.25rem 0.625rem',
                        backgroundColor: 'var(--secondary-container)', borderRadius: 'var(--radius-full)',
                        color: 'var(--primary)', fontWeight: 600
                      }}>{b}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dosha Section */}
      <section className="section-padding">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span style={{ color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.75rem', fontWeight: 600 }}>Know Your Constitution</span>
            <h2 className="heading-headline" style={{ marginTop: '0.75rem', marginBottom: '1rem' }}>The Three Doshas</h2>
            <p style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--on-surface-variant)', lineHeight: 1.7 }}>
              Every individual is a unique blend of three fundamental bio-energies. Understanding your dominant Dosha is the first step toward personalized wellness.
            </p>
          </div>

          <div className="grid-thirds">
            {doshas.map((d, i) => (
              <div key={i} style={{
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-lg)',
                backgroundColor: 'var(--surface)'
              }}>
                <div style={{
                  background: `linear-gradient(135deg, ${d.color}, ${d.color}dd)`,
                  padding: '2.5rem 2rem',
                  color: 'white',
                  textAlign: 'center'
                }}>
                  <h3 style={{ fontFamily: 'var(--font-noto-serif)', fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.5rem' }}>{d.name}</h3>
                  <span style={{ fontSize: '0.875rem', opacity: 0.9 }}>{d.element}</span>
                </div>
                <div style={{ padding: '2rem' }}>
                  <div style={{ marginBottom: '1.25rem' }}>
                    <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--on-surface-variant)', marginBottom: '0.5rem', fontWeight: 600 }}>Characteristics</h4>
                    <p style={{ fontSize: '0.9375rem', color: 'var(--on-surface)' }}>{d.traits}</p>
                  </div>
                  <div style={{ marginBottom: '1.25rem' }}>
                    <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--on-surface-variant)', marginBottom: '0.5rem', fontWeight: 600 }}>Signs of Imbalance</h4>
                    <p style={{ fontSize: '0.9375rem', color: 'var(--error)' }}>{d.imbalance}</p>
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--on-surface-variant)', marginBottom: '0.5rem', fontWeight: 600 }}>Recommended Remedies</h4>
                    <p style={{ fontSize: '0.9375rem', color: 'var(--primary)', fontWeight: 500 }}>{d.remedies}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dinacharya — Daily Ritual Timeline */}
      <section className="section-padding" style={{ backgroundColor: 'var(--primary)', color: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span style={{ display: 'block', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.75rem', fontWeight: 600, marginBottom: '1rem' }}>Daily Practice</span>
            <h2 className="heading-headline" style={{ color: 'white', marginBottom: '1rem' }}>Dinacharya — The Ayurvedic Daily Routine</h2>
            <p style={{ color: 'rgba(255,255,255,0.8)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.7 }}>
              Ancient sages prescribed a daily rhythm aligned with nature&apos;s cycles to maintain optimal health and prevent disease.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
            {dinacharya.map((d, i) => (
              <div key={i} style={{
                display: 'flex', gap: '1rem', alignItems: 'flex-start',
                padding: '1.5rem', borderRadius: 'var(--radius-lg)',
                backgroundColor: 'rgba(255,255,255,0.06)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.08)',
                transition: 'all 0.3s ease'
              }}>
                <div style={{
                  width: '44px', height: '44px', borderRadius: 'var(--radius-md)',
                  backgroundColor: 'rgba(212,165,116,0.2)', color: 'var(--accent)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                }}>
                  {d.icon}
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--accent)', fontWeight: 700, fontFamily: 'var(--font-inter)' }}>{d.time}</span>
                    <h4 style={{ fontFamily: 'var(--font-noto-serif)', fontSize: '1.0625rem', fontWeight: 600 }}>{d.ritual}</h4>
                  </div>
                  <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.6 }}>{d.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding" style={{ textAlign: 'center' }}>
        <div className="container">
          <span style={{ color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.75rem', fontWeight: 600, display: 'block', marginBottom: '1rem' }}>Begin Your Journey</span>
          <h2 className="heading-headline" style={{ marginBottom: '1rem' }}>Experience Authentic Ayurvedic Healing</h2>
          <p style={{ color: 'var(--on-surface-variant)', maxWidth: '500px', margin: '0 auto 2rem auto', lineHeight: 1.7 }}>
            Explore our curated collection of Ayurvedic formulations, or book a Prakriti assessment with our practitioners.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/products" className="btn-primary" style={{ padding: '1rem 2.5rem' }}>Shop Ayurvedic Products</Link>
            <Link href="/naturopathy" className="btn-secondary" style={{ padding: '1rem 2.5rem' }}>
              Explore Naturopathy <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
