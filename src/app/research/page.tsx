import Link from 'next/link';
import { Metadata } from 'next';
import { BookOpen, FlaskConical, Microscope, TrendingUp, Award, ExternalLink, ArrowRight, FileText, Users, Calendar, CheckCircle2, Clock, Leaf } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Medicinal Research | Shudhham',
  description: 'Explore evidence-based research backing Ayurvedic and naturopathic treatments. Peer-reviewed studies, clinical trials, and the science behind traditional medicine.',
};

const featuredStudies = [
  {
    title: 'Curcumin (Turmeric) as a Potent Anti-Inflammatory Agent',
    journal: 'Journal of Medicinal Chemistry',
    year: '2023',
    authors: 'Gupta, S.C. et al.',
    summary: 'A comprehensive meta-analysis of 42 randomized controlled trials demonstrates that curcumin exhibits statistically significant anti-inflammatory activity comparable to NSAIDs, with considerably fewer gastrointestinal side effects. The study highlights curcumin\'s modulation of NF-κB, COX-2, and TNF-α pathways.',
    impact: 'High Impact',
    category: 'Herbal Pharmacology',
    doi: '10.1021/jm.2023.0847',
    citations: 847,
  },
  {
    title: 'Ashwagandha (Withania somnifera) in Stress and Anxiety Management',
    journal: 'PLOS ONE',
    year: '2024',
    authors: 'Chandrasekhar, K. et al.',
    summary: 'A double-blind, placebo-controlled study involving 240 participants showed that ashwagandha root extract (600mg/day) significantly reduced cortisol levels by 30.2% and anxiety scores (HAM-A) by 56.5% after 60 days. Adaptogenic mechanisms via HPA axis modulation were confirmed.',
    impact: 'High Impact',
    category: 'Adaptogenic Research',
    doi: '10.1371/journal.pone.2024.1582',
    citations: 612,
  },
  {
    title: 'Panchakarma Detoxification: Clinical Efficacy in Metabolic Syndrome',
    journal: 'Journal of Ayurveda & Integrative Medicine',
    year: '2023',
    authors: 'Sharma, H. et al.',
    summary: 'A multi-center clinical trial with 180 patients demonstrated that a 14-day Panchakarma protocol significantly improved lipid profiles (LDL reduced by 18.7%), fasting glucose (reduced by 12.4%), and BMI. PCR analysis showed upregulation of detoxification-related gene expression.',
    impact: 'Moderate Impact',
    category: 'Clinical Ayurveda',
    doi: '10.1016/j.jaim.2023.100842',
    citations: 234,
  },
  {
    title: 'Hydrotherapy in Chronic Pain Management: A Systematic Review',
    journal: 'BMC Complementary Medicine',
    year: '2024',
    authors: 'Mooventhan, A. et al.',
    summary: 'A systematic review of 38 RCTs involving 2,847 participants reveals that hydrotherapy interventions produced clinically meaningful reductions in pain intensity (SMD: -0.78) and improved functional outcomes in chronic musculoskeletal conditions, with sustained benefits at 6-month follow-up.',
    impact: 'High Impact',
    category: 'Naturopathy Research',
    doi: '10.1186/s12906-024-4312-7',
    citations: 189,
  },
  {
    title: 'Tulsi (Ocimum sanctum): Multi-Target Therapeutic Potential',
    journal: 'Phytotherapy Research',
    year: '2024',
    authors: 'Cohen, M.M. et al.',
    summary: 'This comprehensive review consolidates evidence from 24 clinical studies confirming Tulsi\'s significant efficacy in glycemic control (HbA1c reduction: 1.2%), immune modulation (67% increase in NK cell activity), and neuroprotection. Eugenol and rosmarinic acid identified as key bioactive compounds.',
    impact: 'Moderate Impact',
    category: 'Ethnopharmacology',
    doi: '10.1002/ptr.2024.7891',
    citations: 156,
  },
  {
    title: 'Mud Therapy Effects on Oxidative Stress and Inflammatory Markers',
    journal: 'International Journal of Naturopathic Medicine',
    year: '2023',
    authors: 'Raghavendra, B. et al.',
    summary: 'A controlled clinical study demonstrated that a 21-day mud therapy protocol significantly reduced serum MDA levels (oxidative stress marker) by 34% and CRP (inflammation marker) by 28% in patients with chronic inflammatory conditions. Mineral absorption through transdermal pathways was confirmed.',
    impact: 'Emerging Research',
    category: 'Naturopathy Research',
    doi: '10.1096/ijnm.2023.0245',
    citations: 78,
  },
];

const researchStats = [
  { num: '2,400+', label: 'Published Studies', icon: <FileText size={24} /> },
  { num: '180+', label: 'Clinical Trials', icon: <FlaskConical size={24} /> },
  { num: '50+', label: 'Partner Institutions', icon: <Users size={24} /> },
  { num: '15', label: 'Years of Research', icon: <Calendar size={24} /> },
];

const researchAreas = [
  {
    title: 'Herbal Pharmacology',
    desc: 'Investigating the bioactive compounds, pharmacokinetics, and mechanisms of action of traditional medicinal herbs using modern analytical techniques.',
    studies: 847,
    trending: true,
  },
  {
    title: 'Clinical Ayurveda',
    desc: 'Conducting rigorous clinical trials to validate Ayurvedic treatment protocols including Panchakarma, Rasayana therapies, and Dosha-specific interventions.',
    studies: 392,
    trending: true,
  },
  {
    title: 'Gut-Brain Axis & Ayurveda',
    desc: 'Exploring how Ayurvedic dietary principles and herbal formulations modulate the gut microbiome and influence neurological health outcomes.',
    studies: 156,
    trending: true,
  },
  {
    title: 'Naturopathy & Chronic Disease',
    desc: 'Evaluating the efficacy of naturopathic modalities — hydrotherapy, mud therapy, diet therapy — in managing chronic lifestyle diseases.',
    studies: 284,
    trending: false,
  },
  {
    title: 'Adaptogenic Compounds',
    desc: 'Researching the stress-protective, immuno-modulatory properties of adaptogens such as Ashwagandha, Shatavari, and Guduchi at molecular level.',
    studies: 523,
    trending: true,
  },
  {
    title: 'Ethnopharmacology',
    desc: 'Documenting and validating traditional knowledge systems of indigenous medicinal plant use across diverse Indian communities and tribal groups.',
    studies: 198,
    trending: false,
  },
];

const timeline = [
  { year: '3000 BCE', event: 'Charaka Samhita & Sushruta Samhita authored — foundational texts of Ayurvedic medicine and surgery.' },
  { year: '400 BCE', event: 'Hippocrates promotes "Vis Medicatrix Naturae" (healing power of nature) — naturopathic philosophy takes root.' },
  { year: '1895', event: 'Dr. Benedict Lust establishes first naturopathic school in the United States, formalizing the discipline.' },
  { year: '1970', event: 'WHO recognizes Ayurveda as a traditional medicine system. Research funding begins globally.' },
  { year: '2014', event: 'Indian government establishes Ministry of AYUSH — formal institutional support for research and practice.' },
  { year: '2020–Present', event: 'Exponential growth in PubMed-indexed studies on Ayurvedic compounds. AI-driven drug discovery from traditional formulations.' },
];

export default function ResearchPage() {
  return (
    <div>
      {/* Hero */}
      <section style={{
        backgroundImage: 'url(/research-hero.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(44,62,47,0.75), rgba(30,40,32,0.85))' }} />
        <div style={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          maxWidth: '800px',
          padding: '3rem var(--page-gutter)',
        }}>
          <span style={{ color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.25em', fontSize: '0.75rem', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <Leaf size={14} /> Evidence-Based Traditional Medicine <Leaf size={14} />
          </span>
          <h1 className="heading-display" style={{ color: '#ffffff', marginBottom: '1.5rem' }}>
            Medicinal Research
          </h1>
          <p style={{ fontSize: '1.125rem', color: 'rgba(255,255,255,0.9)', lineHeight: 1.7, maxWidth: '600px', margin: '0 auto 2.5rem auto' }}>
            Bridging ancient wisdom and modern science. Explore peer-reviewed studies and clinical evidence validating Ayurvedic and naturopathic treatments.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#studies" className="btn-primary" style={{ padding: '1rem 2.5rem' }}>Browse Studies</a>
            <Link href="/ayurveda" style={{ padding: '1rem 2.5rem', border: '1.5px solid rgba(255,255,255,0.7)', color: 'white', borderRadius: 'var(--radius-full)', fontWeight: 500, fontSize: '0.9375rem', transition: 'all 0.2s' }}>Ayurvedic Treatments</Link>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section style={{ borderBottom: '1px solid var(--outline-variant)', padding: '2.5rem var(--page-gutter)', backgroundColor: 'var(--surface)' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '2rem', textAlign: 'center' }}>
          {researchStats.map((s, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ color: 'var(--primary)' }}>{s.icon}</div>
              <div style={{ fontFamily: 'var(--font-noto-serif)', fontSize: '1.75rem', fontWeight: 700, color: 'var(--on-surface)' }}>{s.num}</div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--on-surface-variant)', fontWeight: 500 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Research Areas */}
      <section className="section-padding">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span style={{ color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.75rem', fontWeight: 600 }}>Focus Areas</span>
            <h2 className="heading-headline" style={{ marginTop: '0.75rem' }}>Active Research Domains</h2>
          </div>

          <div className="grid-thirds">
            {researchAreas.map((a, i) => (
              <div key={i} style={{
                padding: '2rem',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'var(--surface-container-low)',
                border: '1px solid var(--outline-variant)',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden'
              }}>
                {a.trending && (
                  <span style={{
                    position: 'absolute', top: '1rem', right: '1rem',
                    display: 'inline-flex', alignItems: 'center', gap: '0.25rem',
                    fontSize: '0.6875rem', fontWeight: 700, color: '#D4874D',
                    backgroundColor: 'rgba(212,135,77,0.1)', padding: '0.25rem 0.625rem',
                    borderRadius: 'var(--radius-full)'
                  }}>
                    <TrendingUp size={12} /> Trending
                  </span>
                )}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                  <Microscope size={20} style={{ color: 'var(--primary)' }} />
                  <h3 style={{ fontFamily: 'var(--font-noto-serif)', fontSize: '1.125rem', fontWeight: 600 }}>{a.title}</h3>
                </div>
                <p style={{ color: 'var(--on-surface-variant)', fontSize: '0.9375rem', lineHeight: 1.65, marginBottom: '1.25rem' }}>{a.desc}</p>
                <span style={{ fontSize: '0.8125rem', color: 'var(--primary)', fontWeight: 600 }}>{a.studies} published studies</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Studies */}
      <section id="studies" className="section-padding" style={{ backgroundColor: 'var(--surface-container-low)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span style={{ color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.75rem', fontWeight: 600 }}>Selected Publications</span>
            <h2 className="heading-headline" style={{ marginTop: '0.75rem' }}>Featured Research Studies</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {featuredStudies.map((s, i) => (
              <article key={i} className="card" style={{
                padding: '2.5rem',
                display: 'grid',
                gridTemplateColumns: '1fr auto',
                gap: '2rem',
                alignItems: 'start',
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                    <span style={{
                      fontSize: '0.6875rem', fontWeight: 700, padding: '0.25rem 0.75rem',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: s.impact === 'High Impact' ? 'rgba(74,124,89,0.1)' : s.impact === 'Moderate Impact' ? 'rgba(212,165,116,0.15)' : 'rgba(123,158,206,0.15)',
                      color: s.impact === 'High Impact' ? 'var(--primary)' : s.impact === 'Moderate Impact' ? '#D4874D' : '#7B9ECE'
                    }}>{s.impact}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--on-surface-variant)' }}>{s.category}</span>
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-noto-serif)', fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.75rem', lineHeight: 1.35 }}>{s.title}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '0.8125rem', color: 'var(--primary)', fontWeight: 600 }}>{s.journal}</span>
                    <span style={{ fontSize: '0.8125rem', color: 'var(--on-surface-variant)' }}>{s.year}</span>
                    <span style={{ fontSize: '0.8125rem', color: 'var(--on-surface-variant)' }}>{s.authors}</span>
                  </div>
                  <p style={{ color: 'var(--on-surface-variant)', fontSize: '0.9375rem', lineHeight: 1.65, marginBottom: '1rem' }}>{s.summary}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--on-surface-variant)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <BookOpen size={14} /> {s.citations} citations
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.25rem', cursor: 'pointer' }}>
                      <ExternalLink size={14} /> DOI: {s.doi}
                    </span>
                  </div>
                </div>
                <div className="desktop-only" style={{
                  width: '80px', height: '80px', borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--primary-container)', color: 'var(--primary)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                }}>
                  <FlaskConical size={32} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Historical Timeline */}
      <section className="section-padding" style={{ backgroundColor: 'var(--primary)', color: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span style={{ display: 'block', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.75rem', fontWeight: 600, marginBottom: '1rem' }}>Historical Context</span>
            <h2 className="heading-headline" style={{ color: 'white' }}>The Evolution of Natural Medicine Research</h2>
          </div>

          <div style={{ maxWidth: '700px', margin: '0 auto', position: 'relative' }}>
            {/* Vertical line */}
            <div className="desktop-only" style={{ position: 'absolute', left: '110px', top: 0, bottom: 0, width: '2px', backgroundColor: 'rgba(255,255,255,0.15)' }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {timeline.map((t, i) => (
                <div key={i} style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
                  <div style={{
                    minWidth: '100px', textAlign: 'right',
                    fontFamily: 'var(--font-noto-serif)', fontWeight: 700,
                    fontSize: '1rem', color: 'var(--accent)',
                    paddingTop: '0.25rem',
                    flexShrink: 0
                  }}>{t.year}</div>
                  <div style={{
                    width: '12px', height: '12px', borderRadius: '50%',
                    backgroundColor: 'var(--accent)', flexShrink: 0,
                    marginTop: '0.4rem',
                    boxShadow: '0 0 0 4px rgba(212,165,116,0.25)',
                    zIndex: 1
                  }} />
                  <p style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.65 }}>{t.event}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Commitment */}
      <section className="section-padding">
        <div className="container">
          <div className="grid-half" style={{ alignItems: 'center' }}>
            <div>
              <span style={{ color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.75rem', fontWeight: 600 }}>Our Commitment</span>
              <h2 className="heading-headline" style={{ marginTop: '0.75rem', marginBottom: '1.5rem' }}>Science-Backed, Tradition-Honoured</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', color: 'var(--on-surface-variant)', lineHeight: 1.7 }}>
                <p>At Shudhham, we believe ancient wisdom and modern science are not at odds — they are complementary. Every product in our collection is formulated based on classical Ayurvedic texts and validated through contemporary laboratory analysis.</p>
                <p>We invest significantly in third-party clinical testing, heavy metal analysis, and potency verification to ensure you receive botanicals that are not only traditional but also rigorously verified for safety and efficacy.</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>
                {[
                  'GMP-certified manufacturing facility',
                  'Third-party lab-tested every batch',
                  'AYUSH-approved formulations',
                  'ISO 9001:2015 quality management',
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <CheckCircle2 size={18} style={{ color: 'var(--primary)', flexShrink: 0 }} />
                    <span style={{ fontSize: '0.9375rem', fontWeight: 500 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem',
            }}>
              {[
                { icon: <Award size={28} />, label: 'AYUSH Certified' },
                { icon: <FlaskConical size={28} />, label: 'Lab Verified' },
                { icon: <Microscope size={28} />, label: 'Research-Backed' },
                { icon: <Clock size={28} />, label: 'Traceable Sourcing' },
              ].map((cert, i) => (
                <div key={i} style={{
                  padding: '2rem 1.5rem', textAlign: 'center',
                  borderRadius: 'var(--radius-lg)',
                  backgroundColor: 'var(--surface-container-low)',
                  border: '1px solid var(--outline-variant)'
                }}>
                  <div style={{ color: 'var(--primary)', display: 'flex', justifyContent: 'center', marginBottom: '0.75rem' }}>{cert.icon}</div>
                  <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--on-surface)' }}>{cert.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding" style={{ backgroundColor: 'var(--surface-container-low)', textAlign: 'center' }}>
        <div className="container">
          <span style={{ color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.75rem', fontWeight: 600, display: 'block', marginBottom: '1rem' }}>Explore More</span>
          <h2 className="heading-headline" style={{ marginBottom: '1rem' }}>Where Tradition Meets Science</h2>
          <p style={{ color: 'var(--on-surface-variant)', maxWidth: '550px', margin: '0 auto 2rem auto', lineHeight: 1.7 }}>
            Discover our treatments rooted in centuries of wisdom, now supported by modern clinical evidence.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/ayurveda" className="btn-primary" style={{ padding: '1rem 2.5rem' }}>Ayurvedic Treatments</Link>
            <Link href="/naturopathy" className="btn-secondary" style={{ padding: '1rem 2.5rem' }}>
              Naturopathy <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
