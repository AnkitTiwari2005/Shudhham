import { Metadata } from 'next';
import Link from 'next/link';
import { FileText, ShoppingBag, AlertTriangle, Scale, Ban, RefreshCw, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service | Shudhham',
  description: 'Read the Terms of Service for Shudhham. By using our website, you agree to these terms governing your use of our platform and products.',
};

const sections = [
  {
    icon: ShoppingBag,
    number: '01',
    title: 'Use of the Website',
    items: [
      'You must be at least 18 years of age to use this website or make purchases.',
      'You agree to use the website only for lawful purposes and in a manner that does not infringe the rights of others.',
      'You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.',
      'You agree not to attempt to gain unauthorized access to any part of the website, or to any other systems or networks connected to the website.',
      'Shudhham reserves the right to terminate your account or restrict access if you violate these terms.',
    ],
  },
  {
    icon: ShoppingBag,
    number: '02',
    title: 'Products & Orders',
    items: [
      'All product descriptions, images, and prices are for informational purposes and are subject to change without notice.',
      'We reserve the right to limit quantities of any products or services that we offer.',
      'By placing an order, you represent that you are purchasing for personal, non-commercial use and that you are 18 years of age or older.',
      'We reserve the right to refuse or cancel any order for any reason, including inaccuracies in product or pricing information.',
      'Title and risk of loss for products pass to you upon our delivery of the product to the carrier.',
    ],
  },
  {
    icon: Scale,
    number: '03',
    title: 'Pricing & Payment',
    items: [
      'All prices are listed in Indian Rupees (INR) and are inclusive of applicable taxes unless stated otherwise.',
      'We accept major payment methods including credit/debit cards, UPI, net banking, and other methods listed at checkout.',
      'Payments are processed securely through Razorpay. Shudhham does not store your payment card information.',
      'In the event of a pricing error, we reserve the right to cancel your order and issue a full refund.',
      'Promotional prices and discounts are valid only for the specified period and cannot be retroactively applied.',
    ],
  },
  {
    icon: AlertTriangle,
    number: '04',
    title: 'Health & Product Disclaimer',
    items: [
      'Our Ayurvedic and natural wellness products are not intended to diagnose, treat, cure, or prevent any disease or medical condition.',
      'Results from using our products may vary from person to person and are not guaranteed.',
      'Please consult a qualified healthcare practitioner before using any of our products, especially if you are pregnant, nursing, taking medications, or have an existing medical condition.',
      'Shudhham is not responsible for any adverse reactions that occur from use of our products when they are not used as directed.',
      'Refer to our full Medical Disclaimer for comprehensive health-related disclosures.',
    ],
  },
  {
    icon: FileText,
    number: '05',
    title: 'Intellectual Property',
    items: [
      'All content on this website — including text, graphics, logos, images, product descriptions, and software — is the property of Shudhham and is protected by applicable intellectual property laws.',
      'You may not reproduce, distribute, modify, display, or create derivative works from any content on this site without our explicit written permission.',
      'Trademarks, service marks, and trade names appearing on this site are the property of their respective owners.',
      'User-submitted content (e.g., product reviews) grants Shudhham a non-exclusive, royalty-free license to use, reproduce, and display such content.',
    ],
  },
  {
    icon: Ban,
    number: '06',
    title: 'Limitation of Liability',
    items: [
      'To the fullest extent permitted by law, Shudhham and its affiliates, officers, directors, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages.',
      'Our total liability to you for any claim arising out of or relating to these terms or your use of the website shall not exceed the amount you paid to us in the six months preceding the claim.',
      'We do not warrant that the website will be uninterrupted, error-free, or free of viruses or other harmful components.',
      'We are not responsible for delays or failures in performance resulting from acts beyond our reasonable control (force majeure).',
    ],
  },
  {
    icon: RefreshCw,
    number: '07',
    title: 'Changes to Terms',
    items: [
      'Shudhham reserves the right to modify these Terms of Service at any time.',
      'We will notify users of material changes by posting the updated terms with a new effective date.',
      'Your continued use of the website after changes are posted constitutes your acceptance of the revised terms.',
      'If you do not agree with the revised terms, you must discontinue use of the website.',
    ],
  },
];

export default function TermsPage() {
  return (
    <div>
      {/* Hero */}
      <section className="section-padding" style={{ backgroundColor: 'var(--surface-container-low)', borderBottom: '1px solid var(--outline-variant)' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '760px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 56, height: 56, borderRadius: '50%', backgroundColor: 'var(--primary-container)', marginBottom: '1.5rem' }}>
            <FileText size={28} color="var(--primary)" />
          </div>
          <span style={{ color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.75rem', marginBottom: '1rem', display: 'block', fontWeight: 600 }}>
            Legal
          </span>
          <h1 className="heading-display" style={{ marginBottom: '1.5rem' }}>Terms of Service</h1>
          <p style={{ fontSize: '1.0625rem', color: 'var(--on-surface-variant)', lineHeight: 1.7 }}>
            Please read these terms carefully before using our website or purchasing our products. By accessing Shudhham, you agree to be bound by these terms.
          </p>
          <p style={{ marginTop: '1.5rem', fontSize: '0.875rem', color: 'var(--on-surface-variant)', opacity: 0.7 }}>
            Last Updated: July 28, 2026 &nbsp;|&nbsp; Effective Date: July 28, 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container" style={{ maxWidth: '860px' }}>

          {/* Acceptance box */}
          <div style={{ backgroundColor: 'var(--primary-container)', borderRadius: 'var(--radius-xl)', padding: '2rem 2.5rem', marginBottom: '4rem', borderLeft: '4px solid var(--primary)' }}>
            <p style={{ color: 'var(--primary-dark)', lineHeight: 1.8, fontSize: '1rem' }}>
              <strong>Agreement to Terms:</strong> These Terms of Service constitute a legally binding agreement between you and Shudhham E-Commerce (&quot;Shudhham&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), a natural wellness apothecary operating from New Delhi, India. By visiting, browsing, or purchasing from our website, you confirm you have read, understood, and agree to these terms and our Privacy Policy.
            </p>
          </div>

          {/* Sections */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
            {sections.map((section, i) => {
              const Icon = section.icon;
              return (
                <div key={i} style={{ borderBottom: '1px solid var(--outline-variant)', paddingBottom: '3.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem', marginBottom: '2rem' }}>
                    <span style={{ fontFamily: 'var(--font-noto-serif)', fontSize: '2.5rem', fontWeight: 700, color: 'var(--outline-variant)', lineHeight: 1, flexShrink: 0, marginTop: '0.2rem' }}>
                      {section.number}
                    </span>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.25rem' }}>
                        <Icon size={18} color="var(--primary)" />
                        <h2 className="heading-headline" style={{ fontSize: '1.375rem' }}>{section.title}</h2>
                      </div>
                    </div>
                  </div>

                  <ul style={{ paddingLeft: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {section.items.map((item, j) => (
                      <li key={j} style={{ color: 'var(--on-surface-variant)', lineHeight: 1.8, fontSize: '0.9375rem', paddingLeft: '0.5rem', borderLeft: '2px solid var(--outline-variant)', listStyle: 'none' }}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}

            {/* Governing Law */}
            <div style={{ borderBottom: '1px solid var(--outline-variant)', paddingBottom: '3.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1.5rem' }}>
                <Scale size={18} color="var(--primary)" />
                <h2 className="heading-headline" style={{ fontSize: '1.375rem' }}>Governing Law & Dispute Resolution</h2>
              </div>
              <p style={{ color: 'var(--on-surface-variant)', lineHeight: 1.8, fontSize: '0.9375rem', marginBottom: '1rem' }}>
                These Terms of Service shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions. The courts of New Delhi, India shall have exclusive jurisdiction over any disputes arising from these terms.
              </p>
              <p style={{ color: 'var(--on-surface-variant)', lineHeight: 1.8, fontSize: '0.9375rem' }}>
                We encourage you to first contact us directly to resolve any disputes amicably before initiating formal legal proceedings. We are committed to fair, transparent resolution of all customer concerns.
              </p>
            </div>

            {/* Entire Agreement */}
            <div>
              <h2 className="heading-headline" style={{ fontSize: '1.375rem', marginBottom: '1rem' }}>Entire Agreement</h2>
              <p style={{ color: 'var(--on-surface-variant)', lineHeight: 1.8, fontSize: '0.9375rem' }}>
                These Terms of Service, together with our Privacy Policy, Medical Disclaimer, and Refund & Shipping Policy, constitute the entire agreement between you and Shudhham regarding your use of this website and supersede all prior agreements, understandings, and communications, whether written or oral.
              </p>
            </div>
          </div>

          {/* Contact CTA */}
          <div style={{ marginTop: '4rem', backgroundColor: 'var(--surface-container-low)', borderRadius: 'var(--radius-xl)', padding: '2.5rem', textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 48, height: 48, borderRadius: '50%', backgroundColor: 'var(--primary-container)', marginBottom: '1rem' }}>
              <Mail size={22} color="var(--primary)" />
            </div>
            <h2 className="heading-headline" style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>Questions or Concerns?</h2>
            <p style={{ color: 'var(--on-surface-variant)', marginBottom: '1.75rem', lineHeight: 1.7 }}>
              If you have any questions about these Terms of Service, please contact us.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/contact" className="btn-primary">Contact Us</Link>
              <a href="mailto:shivskukreja@gmail.com" className="btn-secondary">shivskukreja@gmail.com</a>
            </div>
          </div>

          {/* Related links */}
          <div style={{ marginTop: '3rem', display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap', fontSize: '0.875rem' }}>
            <Link href="/privacy" style={{ color: 'var(--primary)', fontWeight: 500 }}>Privacy Policy →</Link>
            <Link href="/disclaimer" style={{ color: 'var(--primary)', fontWeight: 500 }}>Medical Disclaimer →</Link>
            <Link href="/refund-policy" style={{ color: 'var(--primary)', fontWeight: 500 }}>Refund & Shipping Policy →</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
