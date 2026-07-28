import { Metadata } from 'next';
import Link from 'next/link';
import { Shield, Cookie, Eye, Share2, Lock, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | Shudhham',
  description: 'Learn how Shudhham collects, uses, and protects your personal information. Our privacy practices are built on transparency and trust.',
};

const sections = [
  {
    icon: Eye,
    title: 'Information We Collect',
    content: [
      {
        subtitle: 'Personal Information',
        text: 'When you create an account, place an order, or contact us, we collect information such as your name, email address, shipping address, phone number, and payment details (processed securely via third-party payment processors — we never store raw card data).',
      },
      {
        subtitle: 'Usage Data',
        text: 'We automatically collect information about how you interact with our website, including your IP address, browser type, pages visited, time spent on pages, and referring URLs. This helps us improve your experience.',
      },
      {
        subtitle: 'Cookies & Tracking Technologies',
        text: 'We use cookies, web beacons, and similar technologies to enhance functionality, remember your preferences, and analyze site traffic. See our Cookie Policy section below for full details.',
      },
    ],
  },
  {
    icon: Share2,
    title: 'How We Use Your Information',
    content: [
      {
        subtitle: 'Order Fulfillment',
        text: 'To process and deliver your orders, send shipping confirmations, and handle returns or refund requests.',
      },
      {
        subtitle: 'Communication',
        text: 'To respond to your inquiries, send transactional emails, and — with your explicit consent — newsletters with wellness tips and product updates. You may unsubscribe at any time.',
      },
      {
        subtitle: 'Site Improvement',
        text: 'To analyze usage patterns, conduct A/B testing, and improve the functionality, design, and content of our website.',
      },
      {
        subtitle: 'Legal Compliance',
        text: 'To comply with applicable laws, prevent fraud, enforce our Terms of Service, and protect the rights and safety of Shudhham and our users.',
      },
    ],
  },
  {
    icon: Share2,
    title: 'Third-Party Sharing',
    content: [
      {
        subtitle: 'Service Providers',
        text: 'We share data with trusted third parties who assist us in operating our website and services — including payment processors (Razorpay), shipping partners, and email marketing platforms. These parties are contractually bound to protect your data.',
      },
      {
        subtitle: 'Analytics',
        text: 'We use Google Analytics to understand website traffic. Google may use this data in accordance with its own privacy policy. You can opt out at any time via the Google Analytics Opt-out Browser Add-on.',
      },
      {
        subtitle: 'Legal Obligations',
        text: 'We may disclose your information if required to do so by law, court order, or governmental authority.',
      },
      {
        subtitle: 'We Never Sell Your Data',
        text: 'Shudhham does not sell, rent, or trade your personal information to third parties for their own marketing purposes.',
      },
    ],
  },
  {
    icon: Cookie,
    title: 'Cookie Policy & Google AdSense',
    content: [
      {
        subtitle: 'What Are Cookies?',
        text: 'Cookies are small text files placed on your device by websites you visit. They are widely used to make websites work efficiently and to provide reporting information.',
      },
      {
        subtitle: 'How We Use Cookies',
        text: 'We use essential cookies for site functionality (e.g., your shopping cart and login session), analytics cookies to measure traffic, and advertising cookies to serve relevant ads.',
      },
      {
        subtitle: 'Google AdSense & the DART Cookie',
        text: 'We use Google AdSense to display advertisements on this website. Google, as a third-party vendor, uses cookies — including the DART cookie — to serve ads to our users based on their visit to our site and other sites on the Internet. You may opt out of the use of the DART cookie by visiting the Google Ad and Content Network privacy policy at: https://policies.google.com/technologies/ads.',
      },
      {
        subtitle: 'Third-Party Advertising Cookies',
        text: 'Third-party vendors and ad networks may also use cookies to serve ads on our site. These vendors\' use of cookies enables them to serve ads based on your prior visits to our website or other websites. Users may opt out of personalized advertising by visiting www.aboutads.info/choices or https://www.networkadvertising.org/choices/.',
      },
      {
        subtitle: 'Managing Cookies',
        text: 'You can control and/or delete cookies via your browser settings. Disabling certain cookies may affect site functionality. For more information, visit www.allaboutcookies.org.',
      },
    ],
  },
  {
    icon: Lock,
    title: 'Data Security & Retention',
    content: [
      {
        subtitle: 'Security Measures',
        text: 'We implement industry-standard security measures including SSL/TLS encryption, secure database access controls, and regular security audits to protect your information from unauthorized access, alteration, disclosure, or destruction.',
      },
      {
        subtitle: 'Data Retention',
        text: 'We retain your personal data for as long as your account is active or as needed to provide services, comply with our legal obligations, resolve disputes, and enforce our agreements. You may request deletion of your account and data at any time.',
      },
    ],
  },
  {
    icon: Shield,
    title: 'Your Rights',
    content: [
      {
        subtitle: 'Access & Correction',
        text: 'You have the right to access the personal information we hold about you and to request corrections if it is inaccurate.',
      },
      {
        subtitle: 'Deletion',
        text: 'You may request the deletion of your personal data, subject to certain legal exceptions (e.g., outstanding orders or legal obligations).',
      },
      {
        subtitle: 'Portability',
        text: 'You may request a copy of your personal data in a structured, commonly used format.',
      },
      {
        subtitle: 'Withdraw Consent',
        text: 'Where processing is based on consent (e.g., marketing emails), you may withdraw consent at any time without affecting the lawfulness of processing prior to withdrawal.',
      },
    ],
  },
];

export default function PrivacyPage() {
  return (
    <div>
      {/* Hero */}
      <section className="section-padding" style={{ backgroundColor: 'var(--surface-container-low)', borderBottom: '1px solid var(--outline-variant)' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '760px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 56, height: 56, borderRadius: '50%', backgroundColor: 'var(--primary-container)', marginBottom: '1.5rem' }}>
            <Shield size={28} color="var(--primary)" />
          </div>
          <span style={{ color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.75rem', marginBottom: '1rem', display: 'block', fontWeight: 600 }}>
            Legal
          </span>
          <h1 className="heading-display" style={{ marginBottom: '1.5rem' }}>Privacy Policy</h1>
          <p style={{ fontSize: '1.0625rem', color: 'var(--on-surface-variant)', lineHeight: 1.7 }}>
            Your privacy is fundamental to our relationship. This policy explains transparently how Shudhham collects, uses, and safeguards your information.
          </p>
          <p style={{ marginTop: '1.5rem', fontSize: '0.875rem', color: 'var(--on-surface-variant)', opacity: 0.7 }}>
            Last Updated: July 28, 2026 &nbsp;|&nbsp; Effective Date: July 28, 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container" style={{ maxWidth: '860px' }}>

          {/* Intro box */}
          <div style={{ backgroundColor: 'var(--primary-container)', borderRadius: 'var(--radius-xl)', padding: '2rem 2.5rem', marginBottom: '4rem', borderLeft: '4px solid var(--primary)' }}>
            <p style={{ color: 'var(--primary-dark)', lineHeight: 1.8, fontSize: '1rem' }}>
              <strong>Overview:</strong> Shudhham (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) operates the website <strong>shudhham.com</strong>. We are committed to protecting your personal information. This policy applies to all information collected through our website, related services, sales, marketing, and events. By using our site, you agree to the collection and use of information in accordance with this policy.
            </p>
          </div>

          {/* Sections */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
            {sections.map((section, i) => {
              const Icon = section.icon;
              return (
                <div key={i} style={{ borderBottom: '1px solid var(--outline-variant)', paddingBottom: '3.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', marginBottom: '2rem' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, borderRadius: 'var(--radius-md)', backgroundColor: 'var(--secondary-container)', flexShrink: 0 }}>
                      <Icon size={20} color="var(--primary)" />
                    </div>
                    <h2 className="heading-headline" style={{ fontSize: '1.5rem' }}>{section.title}</h2>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', paddingLeft: '0.5rem' }}>
                    {section.content.map((item, j) => (
                      <div key={j}>
                        <h3 style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--on-surface)', marginBottom: '0.5rem' }}>
                          {item.subtitle}
                        </h3>
                        <p style={{ color: 'var(--on-surface-variant)', lineHeight: 1.8, fontSize: '0.9375rem' }}>
                          {item.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}

            {/* Children's Privacy */}
            <div style={{ borderBottom: '1px solid var(--outline-variant)', paddingBottom: '3.5rem' }}>
              <h2 className="heading-headline" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Children&apos;s Privacy</h2>
              <p style={{ color: 'var(--on-surface-variant)', lineHeight: 1.8, fontSize: '0.9375rem' }}>
                Our website and services are not directed at individuals under the age of 13. We do not knowingly collect personally identifiable information from children. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately so we can delete it.
              </p>
            </div>

            {/* Links to Other Sites */}
            <div style={{ borderBottom: '1px solid var(--outline-variant)', paddingBottom: '3.5rem' }}>
              <h2 className="heading-headline" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Links to Other Websites</h2>
              <p style={{ color: 'var(--on-surface-variant)', lineHeight: 1.8, fontSize: '0.9375rem' }}>
                Our website may contain links to third-party websites. These sites have their own privacy policies, and we have no responsibility or liability for their content, activities, or practices. We encourage you to review the privacy policy of every site you visit.
              </p>
            </div>

            {/* Changes */}
            <div style={{ borderBottom: '1px solid var(--outline-variant)', paddingBottom: '3.5rem' }}>
              <h2 className="heading-headline" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Changes to This Policy</h2>
              <p style={{ color: 'var(--on-surface-variant)', lineHeight: 1.8, fontSize: '0.9375rem' }}>
                We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the new policy on this page with a revised &quot;Last Updated&quot; date. We encourage you to review this policy periodically for any changes.
              </p>
            </div>
          </div>

          {/* Contact CTA */}
          <div style={{ marginTop: '4rem', backgroundColor: 'var(--surface-container-low)', borderRadius: 'var(--radius-xl)', padding: '2.5rem', textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 48, height: 48, borderRadius: '50%', backgroundColor: 'var(--primary-container)', marginBottom: '1rem' }}>
              <Mail size={22} color="var(--primary)" />
            </div>
            <h2 className="heading-headline" style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>Questions About This Policy?</h2>
            <p style={{ color: 'var(--on-surface-variant)', marginBottom: '1.75rem', lineHeight: 1.7 }}>
              If you have any questions, concerns, or requests regarding this Privacy Policy, please reach out to us.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/contact" className="btn-primary">Contact Us</Link>
              <a href="mailto:shivskukreja@gmail.com" className="btn-secondary">shivskukreja@gmail.com</a>
            </div>
          </div>

          {/* Related links */}
          <div style={{ marginTop: '3rem', display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap', fontSize: '0.875rem' }}>
            <Link href="/terms" style={{ color: 'var(--primary)', fontWeight: 500 }}>Terms of Service →</Link>
            <Link href="/disclaimer" style={{ color: 'var(--primary)', fontWeight: 500 }}>Medical Disclaimer →</Link>
            <Link href="/refund-policy" style={{ color: 'var(--primary)', fontWeight: 500 }}>Refund & Shipping Policy →</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
