import { Metadata } from 'next';
import Link from 'next/link';
import { AlertTriangle, Heart, Phone, BookOpen, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Medical Disclaimer | Shudhham',
  description: 'Important medical and health disclaimer for Shudhham products and wellness content. Our products are not intended to diagnose, treat, or cure any disease.',
};

export default function DisclaimerPage() {
  return (
    <div>
      {/* Hero */}
      <section className="section-padding" style={{ backgroundColor: '#FFF8F0', borderBottom: '1px solid #F5E6D3' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '760px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 56, height: 56, borderRadius: '50%', backgroundColor: '#FEF3C7', marginBottom: '1.5rem' }}>
            <AlertTriangle size={28} color="#D97706" />
          </div>
          <span style={{ color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.75rem', marginBottom: '1rem', display: 'block', fontWeight: 600 }}>
            Important Notice
          </span>
          <h1 className="heading-display" style={{ marginBottom: '1.5rem' }}>Medical Disclaimer</h1>
          <p style={{ fontSize: '1.0625rem', color: 'var(--on-surface-variant)', lineHeight: 1.7 }}>
            Your health and safety are our highest priority. Please read this disclaimer carefully before using any Shudhham products or relying on information from our website.
          </p>
          <p style={{ marginTop: '1.5rem', fontSize: '0.875rem', color: 'var(--on-surface-variant)', opacity: 0.7 }}>
            Last Updated: July 28, 2026
          </p>
        </div>
      </section>

      {/* Urgent Banner */}
      <div style={{ backgroundColor: '#FEF3C7', borderTop: '1px solid #FDE68A', borderBottom: '1px solid #FDE68A', padding: '1.25rem 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <AlertTriangle size={18} color="#D97706" style={{ flexShrink: 0 }} />
          <p style={{ color: '#92400E', fontWeight: 600, fontSize: '0.9375rem', textAlign: 'center' }}>
            If you are experiencing a medical emergency, please call <a href="tel:112" style={{ color: '#92400E', textDecoration: 'underline' }}>112</a> or visit your nearest emergency room immediately. Do not rely on this website for urgent medical advice.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <section className="section-padding">
        <div className="container" style={{ maxWidth: '860px' }}>

          {/* Core Disclaimer Box */}
          <div style={{ backgroundColor: '#FEF3C7', border: '1.5px solid #FDE68A', borderRadius: 'var(--radius-xl)', padding: '2rem 2.5rem', marginBottom: '4rem' }}>
            <h2 style={{ fontFamily: 'var(--font-noto-serif)', fontSize: '1.25rem', fontWeight: 600, color: '#92400E', marginBottom: '1rem' }}>
              Not a Substitute for Professional Medical Advice
            </h2>
            <p style={{ color: '#78350F', lineHeight: 1.8, fontSize: '0.9375rem' }}>
              The information provided on this website — including product descriptions, wellness articles, Ayurvedic content, and naturopathy guides — is for <strong>general informational and educational purposes only</strong>. It is <strong>not intended as, and does not constitute, medical advice, professional diagnosis, opinion, treatment, or services</strong> to you or any other individual. This information should not be used for diagnosing or treating any health problem or disease, or prescribing any medication or other treatment. Always seek the advice of your physician or other qualified health provider before starting any new treatment or with any questions you may have regarding a medical condition.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>

            {/* Product Disclaimer */}
            <div style={{ borderBottom: '1px solid var(--outline-variant)', paddingBottom: '3.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, borderRadius: 'var(--radius-md)', backgroundColor: 'var(--secondary-container)', flexShrink: 0 }}>
                  <BookOpen size={20} color="var(--primary)" />
                </div>
                <h2 className="heading-headline" style={{ fontSize: '1.5rem' }}>Product Disclaimer</h2>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {[
                  'Our products are <strong>dietary supplements and natural wellness products</strong>, not pharmaceuticals or medicines as defined under the Drugs and Cosmetics Act, 1940 of India.',
                  'These statements have <strong>not been evaluated by the Food and Drug Administration (FDA) of the United States, or the Central Drugs Standard Control Organisation (CDSCO) of India</strong> as drug claims.',
                  'Our products are <strong>not intended to diagnose, treat, cure, or prevent any disease or medical condition</strong>.',
                  'Individual results may vary. The testimonials, reviews, and case studies on our website represent individual experiences and are not guaranteed outcomes.',
                  'All ingredients are of natural origin; however, <strong>natural does not mean risk-free</strong>. Herbal products can interact with prescription medications or cause allergic reactions in some individuals.',
                  'Always <strong>read the full ingredient list</strong> on our product packaging and consult your healthcare provider if you have known allergies or sensitivities.',
                ].map((text, i) => (
                  <div key={i} style={{ display: 'flex', gap: '0.875rem', alignItems: 'flex-start' }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'var(--accent)', flexShrink: 0, marginTop: '0.65rem' }} />
                    <p style={{ color: 'var(--on-surface-variant)', lineHeight: 1.8, fontSize: '0.9375rem' }} dangerouslySetInnerHTML={{ __html: text }} />
                  </div>
                ))}
              </div>
            </div>

            {/* Special Populations */}
            <div style={{ borderBottom: '1px solid var(--outline-variant)', paddingBottom: '3.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, borderRadius: 'var(--radius-md)', backgroundColor: 'var(--secondary-container)', flexShrink: 0 }}>
                  <Heart size={20} color="var(--primary)" />
                </div>
                <h2 className="heading-headline" style={{ fontSize: '1.5rem' }}>Special Populations & Contraindications</h2>
              </div>
              <p style={{ color: 'var(--on-surface-variant)', lineHeight: 1.8, fontSize: '0.9375rem', marginBottom: '1.5rem' }}>
                We strongly urge you to consult a qualified healthcare professional before using our products if you:
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1rem' }}>
                {[
                  'Are pregnant or planning to become pregnant',
                  'Are breastfeeding or nursing',
                  'Are under 18 years of age',
                  'Have a chronic illness or diagnosed condition',
                  'Are currently taking prescription medications',
                  'Have previously experienced allergic reactions to herbs',
                  'Have undergone recent surgery',
                  'Have a compromised immune system',
                ].map((item, i) => (
                  <div key={i} style={{ backgroundColor: 'var(--surface-container-low)', borderRadius: 'var(--radius-md)', padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#D97706', flexShrink: 0 }} />
                    <p style={{ color: 'var(--on-surface-variant)', fontSize: '0.875rem', lineHeight: 1.6 }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Ayurvedic Content */}
            <div style={{ borderBottom: '1px solid var(--outline-variant)', paddingBottom: '3.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, borderRadius: 'var(--radius-md)', backgroundColor: 'var(--secondary-container)', flexShrink: 0 }}>
                  <BookOpen size={20} color="var(--primary)" />
                </div>
                <h2 className="heading-headline" style={{ fontSize: '1.5rem' }}>Ayurvedic & Educational Content</h2>
              </div>
              <p style={{ color: 'var(--on-surface-variant)', lineHeight: 1.8, fontSize: '0.9375rem', marginBottom: '1rem' }}>
                Our Ayurveda, Naturopathy, and Research pages contain traditional knowledge and educational information based on ancient systems of medicine. While we strive for accuracy, this content:
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', paddingLeft: '1rem' }}>
                {[
                  'Is not a substitute for professional Ayurvedic or allopathic consultation.',
                  'May not be applicable to your specific health constitution (Prakriti) or current condition.',
                  'Is drawn from traditional Ayurvedic texts and modern research; individual results and interpretations may vary.',
                  'Should not be used to delay or replace seeking emergency medical care.',
                ].map((item, i) => (
                  <p key={i} style={{ color: 'var(--on-surface-variant)', lineHeight: 1.8, fontSize: '0.9375rem', borderLeft: '2px solid var(--outline-variant)', paddingLeft: '1rem', listStyle: 'none' }}>
                    {item}
                  </p>
                ))}
              </div>
            </div>

            {/* Limitation of Liability */}
            <div>
              <h2 className="heading-headline" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Limitation of Liability</h2>
              <p style={{ color: 'var(--on-surface-variant)', lineHeight: 1.8, fontSize: '0.9375rem' }}>
                Shudhham, its owners, employees, and affiliates shall not be held liable for any direct, indirect, incidental, or consequential damages arising from the use or inability to use our products or from reliance on any information provided on this website. By using this website or purchasing our products, you agree to assume full responsibility for your own health decisions and outcomes. You release Shudhham from any liability related thereto.
              </p>
            </div>
          </div>

          {/* Emergency Contact CTA */}
          <div style={{ marginTop: '4rem', backgroundColor: '#FEF3C7', border: '1.5px solid #FDE68A', borderRadius: 'var(--radius-xl)', padding: '2.5rem', textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 48, height: 48, borderRadius: '50%', backgroundColor: 'rgba(217,119,6,0.15)', marginBottom: '1rem' }}>
              <Phone size={22} color="#D97706" />
            </div>
            <h2 className="heading-headline" style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>Need Guidance?</h2>
            <p style={{ color: 'var(--on-surface-variant)', marginBottom: '1.75rem', lineHeight: 1.7 }}>
              For product-specific questions or to speak with our team about a wellness concern, reach out. For medical emergencies, call <strong>112</strong>.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/contact" className="btn-primary">Talk to Our Team</Link>
              <a href="mailto:shivskukreja@gmail.com" className="btn-secondary">
                <Mail size={16} />
                shivskukreja@gmail.com
              </a>
            </div>
          </div>

          {/* Related links */}
          <div style={{ marginTop: '3rem', display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap', fontSize: '0.875rem' }}>
            <Link href="/privacy" style={{ color: 'var(--primary)', fontWeight: 500 }}>Privacy Policy →</Link>
            <Link href="/terms" style={{ color: 'var(--primary)', fontWeight: 500 }}>Terms of Service →</Link>
            <Link href="/refund-policy" style={{ color: 'var(--primary)', fontWeight: 500 }}>Refund & Shipping Policy →</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
