import { Metadata } from 'next';
import Link from 'next/link';
import { Package, RefreshCw, Truck, Clock, AlertTriangle, Phone, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Refund & Shipping Policy | Shudhham',
  description: 'Shudhham\'s complete refund, return, and shipping policy. Learn about our hassle-free return process, shipping timelines, and delivery charges.',
};

const shippingInfo = [
  { label: 'Standard Delivery', value: '5–7 business days', note: 'Free on orders above ₹499' },
  { label: 'Express Delivery', value: '2–3 business days', note: 'Additional ₹99 charge' },
  { label: 'Same-Day Delivery', value: 'Delhi NCR only', note: 'Order before 12:00 PM' },
  { label: 'COD (Cash on Delivery)', value: 'Available pan-India', note: 'Applicable fees may apply' },
];

export default function RefundPolicyPage() {
  return (
    <div>
      {/* Hero */}
      <section className="section-padding" style={{ backgroundColor: 'var(--surface-container-low)', borderBottom: '1px solid var(--outline-variant)' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '760px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 56, height: 56, borderRadius: '50%', backgroundColor: 'var(--primary-container)', marginBottom: '1.5rem' }}>
            <RefreshCw size={28} color="var(--primary)" />
          </div>
          <span style={{ color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.75rem', marginBottom: '1rem', display: 'block', fontWeight: 600 }}>
            Customer Care
          </span>
          <h1 className="heading-display" style={{ marginBottom: '1.5rem' }}>Refund & Shipping Policy</h1>
          <p style={{ fontSize: '1.0625rem', color: 'var(--on-surface-variant)', lineHeight: 1.7 }}>
            We want you to love every purchase. If something isn&apos;t right, we&apos;ll make it right. Here&apos;s everything you need to know about returns, refunds, and how we deliver your order.
          </p>
          <p style={{ marginTop: '1.5rem', fontSize: '0.875rem', color: 'var(--on-surface-variant)', opacity: 0.7 }}>
            Last Updated: July 28, 2026
          </p>
        </div>
      </section>

      {/* Quick Guarantee Banner */}
      <div style={{ backgroundColor: 'var(--primary)', padding: '1.5rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap' }}>
            {[
              { icon: RefreshCw, text: '7-Day Easy Returns' },
              { icon: Package, text: 'Secure Packaging' },
              { icon: Truck, text: 'Pan-India Shipping' },
              { icon: Clock, text: 'Ships Within 24–48 Hrs' },
            ].map(({ icon: Icon, text }, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', color: 'white' }}>
                <Icon size={18} />
                <span style={{ fontWeight: 600, fontSize: '0.9375rem' }}>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="section-padding">
        <div className="container" style={{ maxWidth: '860px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>

            {/* Return Policy */}
            <div style={{ borderBottom: '1px solid var(--outline-variant)', paddingBottom: '3.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', marginBottom: '2rem' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, borderRadius: 'var(--radius-md)', backgroundColor: 'var(--secondary-container)', flexShrink: 0 }}>
                  <RefreshCw size={20} color="var(--primary)" />
                </div>
                <h2 className="heading-headline" style={{ fontSize: '1.5rem' }}>Return Policy</h2>
              </div>

              <div style={{ backgroundColor: 'var(--primary-container)', borderRadius: 'var(--radius-lg)', padding: '1.5rem 2rem', marginBottom: '2rem', borderLeft: '4px solid var(--primary)' }}>
                <p style={{ color: 'var(--primary-dark)', fontWeight: 600, fontSize: '1rem' }}>
                  We offer a <strong>7-day return window</strong> from the date of delivery for eligible products.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <h3 style={{ fontWeight: 600, color: 'var(--on-surface)', fontSize: '1rem', marginBottom: '0.25rem' }}>To be eligible for a return, your item must:</h3>
                {[
                  'Be unused and in the same condition that you received it.',
                  'Be in the original packaging, with all seals and tamper-evident labels intact.',
                  'Not be a perishable item or consumable that has been opened or partially used.',
                  'Be accompanied by the original invoice or proof of purchase.',
                  'Be reported to us within 7 days of delivery via email or our contact page.',
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: '0.875rem', alignItems: 'flex-start' }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'var(--primary)', flexShrink: 0, marginTop: '0.65rem' }} />
                    <p style={{ color: 'var(--on-surface-variant)', lineHeight: 1.8, fontSize: '0.9375rem' }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Non-Returnable Items */}
            <div style={{ borderBottom: '1px solid var(--outline-variant)', paddingBottom: '3.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', marginBottom: '2rem' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, borderRadius: 'var(--radius-md)', backgroundColor: '#FEF3C7', flexShrink: 0 }}>
                  <AlertTriangle size={20} color="#D97706" />
                </div>
                <h2 className="heading-headline" style={{ fontSize: '1.5rem' }}>Non-Returnable Items</h2>
              </div>
              <p style={{ color: 'var(--on-surface-variant)', lineHeight: 1.8, fontSize: '0.9375rem', marginBottom: '1.5rem' }}>
                For hygiene and safety reasons, the following items cannot be returned or refunded:
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' }}>
                {[
                  'Opened herbal teas & powders',
                  'Opened skincare products',
                  'Products with broken seals',
                  'Customised / made-to-order items',
                  'Gift cards & vouchers',
                  'Perishable goods',
                  'Items marked "Final Sale"',
                  'Items purchased during clearance',
                ].map((item, i) => (
                  <div key={i} style={{ backgroundColor: '#FEF3C7', borderRadius: 'var(--radius-md)', padding: '0.875rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#D97706', flexShrink: 0 }} />
                    <p style={{ color: '#78350F', fontSize: '0.875rem', lineHeight: 1.5 }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Refund Process */}
            <div style={{ borderBottom: '1px solid var(--outline-variant)', paddingBottom: '3.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', marginBottom: '2rem' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, borderRadius: 'var(--radius-md)', backgroundColor: 'var(--secondary-container)', flexShrink: 0 }}>
                  <Package size={20} color="var(--primary)" />
                </div>
                <h2 className="heading-headline" style={{ fontSize: '1.5rem' }}>Refund Process & Timeline</h2>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                {[
                  {
                    step: '1',
                    title: 'Initiate Return',
                    desc: 'Email us at shivskukreja@gmail.com or use our Contact page within 7 days of delivery. Include your order number, reason for return, and photos if the product is damaged.',
                    time: 'Day 1',
                  },
                  {
                    step: '2',
                    title: 'Return Approval',
                    desc: 'Our team will review your request and respond within 1–2 business days with return instructions and a return shipping label (for defective or wrong items).',
                    time: '1–2 Days',
                  },
                  {
                    step: '3',
                    title: 'Ship the Item Back',
                    desc: 'Pack the product securely and ship it to our address using our provided label or your preferred carrier. We recommend using a trackable shipping service.',
                    time: 'Day 3–5',
                  },
                  {
                    step: '4',
                    title: 'Inspection & Approval',
                    desc: 'Once we receive the item, our team inspects it within 2 business days. We will notify you by email whether your refund has been approved.',
                    time: '2 Business Days',
                  },
                  {
                    step: '5',
                    title: 'Refund Issued',
                    desc: 'Approved refunds are processed to your original payment method within 5–10 business days, depending on your bank or payment provider.',
                    time: '5–10 Days',
                  },
                ].map((step, i, arr) => (
                  <div key={i} style={{ display: 'flex', gap: '1.25rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div style={{ width: 36, height: 36, borderRadius: '50%', backgroundColor: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.875rem', flexShrink: 0 }}>
                        {step.step}
                      </div>
                      {i < arr.length - 1 && (
                        <div style={{ width: 2, flex: 1, backgroundColor: 'var(--outline-variant)', margin: '4px 0' }} />
                      )}
                    </div>
                    <div style={{ paddingBottom: i < arr.length - 1 ? '2rem' : '0' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                        <h3 style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--on-surface)' }}>{step.title}</h3>
                        <span style={{ fontSize: '0.75rem', backgroundColor: 'var(--secondary-container)', color: 'var(--primary)', padding: '0.15rem 0.625rem', borderRadius: 'var(--radius-full)', fontWeight: 600 }}>
                          {step.time}
                        </span>
                      </div>
                      <p style={{ color: 'var(--on-surface-variant)', lineHeight: 1.8, fontSize: '0.9375rem' }}>{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Damaged / Wrong Items */}
            <div style={{ borderBottom: '1px solid var(--outline-variant)', paddingBottom: '3.5rem' }}>
              <h2 className="heading-headline" style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Damaged, Defective, or Wrong Items</h2>
              <div style={{ backgroundColor: 'var(--surface-container-low)', borderRadius: 'var(--radius-lg)', padding: '1.75rem 2rem' }}>
                <p style={{ color: 'var(--on-surface-variant)', lineHeight: 1.8, fontSize: '0.9375rem', marginBottom: '1rem' }}>
                  If you receive a product that is damaged, defective, or different from what you ordered, we sincerely apologize. Please contact us within <strong>48 hours of delivery</strong> with:
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {[
                    'Your order number and email address',
                    'Clear photographs of the damaged/wrong item',
                    'A brief description of the issue',
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'var(--primary)', flexShrink: 0 }} />
                      <p style={{ color: 'var(--on-surface-variant)', fontSize: '0.9375rem' }}>{item}</p>
                    </div>
                  ))}
                </div>
                <p style={{ color: 'var(--on-surface-variant)', lineHeight: 1.8, fontSize: '0.9375rem', marginTop: '1rem' }}>
                  We will arrange a <strong>free return pickup and a full refund or replacement</strong> at no additional cost to you.
                </p>
              </div>
            </div>

            {/* Shipping Policy */}
            <div style={{ borderBottom: '1px solid var(--outline-variant)', paddingBottom: '3.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', marginBottom: '2rem' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, borderRadius: 'var(--radius-md)', backgroundColor: 'var(--secondary-container)', flexShrink: 0 }}>
                  <Truck size={20} color="var(--primary)" />
                </div>
                <h2 className="heading-headline" style={{ fontSize: '1.5rem' }}>Shipping Information</h2>
              </div>

              <p style={{ color: 'var(--on-surface-variant)', lineHeight: 1.8, fontSize: '0.9375rem', marginBottom: '2rem' }}>
                We ship pan-India via trusted courier partners including Delhivery, Blue Dart, and India Post. Orders are processed within <strong>24–48 business hours</strong> of payment confirmation.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                {shippingInfo.map((info, i) => (
                  <div key={i} style={{ backgroundColor: 'var(--surface-container-low)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', border: '1px solid var(--outline-variant)' }}>
                    <p style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--on-surface)', marginBottom: '0.25rem' }}>{info.label}</p>
                    <p style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.9375rem', marginBottom: '0.5rem' }}>{info.value}</p>
                    <p style={{ color: 'var(--on-surface-variant)', fontSize: '0.8125rem', lineHeight: 1.5 }}>{info.note}</p>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  'Tracking information will be emailed to you once your order ships.',
                  'Delivery times are estimates and may vary due to location, weather, or courier delays beyond our control.',
                  'Shudhham is not responsible for delays caused by incorrect shipping addresses provided at checkout.',
                  'For international shipping inquiries, please contact us directly.',
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: '0.875rem', alignItems: 'flex-start' }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'var(--accent)', flexShrink: 0, marginTop: '0.65rem' }} />
                    <p style={{ color: 'var(--on-surface-variant)', lineHeight: 1.8, fontSize: '0.9375rem' }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Cancellations */}
            <div>
              <h2 className="heading-headline" style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Order Cancellation</h2>
              <p style={{ color: 'var(--on-surface-variant)', lineHeight: 1.8, fontSize: '0.9375rem', marginBottom: '1rem' }}>
                Orders can be cancelled <strong>within 2 hours of placement</strong> for a full refund. After 2 hours, your order may already be in processing or packed for dispatch.
              </p>
              <p style={{ color: 'var(--on-surface-variant)', lineHeight: 1.8, fontSize: '0.9375rem' }}>
                If your order has already shipped, you will need to follow the standard return process once it is delivered. Cancellation requests can be submitted via email or our Contact page.
              </p>
            </div>
          </div>

          {/* Contact CTA */}
          <div style={{ marginTop: '4rem', backgroundColor: 'var(--surface-container-low)', borderRadius: 'var(--radius-xl)', padding: '2.5rem', textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 48, height: 48, borderRadius: '50%', backgroundColor: 'var(--primary-container)', marginBottom: '1rem' }}>
              <Phone size={22} color="var(--primary)" />
            </div>
            <h2 className="heading-headline" style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>Need Help with Your Order?</h2>
            <p style={{ color: 'var(--on-surface-variant)', marginBottom: '1.75rem', lineHeight: 1.7 }}>
              Our customer care team is available Monday to Saturday, 10 AM – 8 PM. Don&apos;t hesitate to reach out — we&apos;re always happy to help.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/contact" className="btn-primary">Contact Support</Link>
              <a href="mailto:shivskukreja@gmail.com" className="btn-secondary">
                <Mail size={16} />
                shivskukreja@gmail.com
              </a>
            </div>
            <p style={{ marginTop: '1.25rem', color: 'var(--on-surface-variant)', fontSize: '0.875rem' }}>
              Or call us at{' '}
              <a href="tel:+919811797407" style={{ color: 'var(--primary)', fontWeight: 600 }}>+91 98117 97407</a>
            </p>
          </div>

          {/* Related links */}
          <div style={{ marginTop: '3rem', display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap', fontSize: '0.875rem' }}>
            <Link href="/privacy" style={{ color: 'var(--primary)', fontWeight: 500 }}>Privacy Policy →</Link>
            <Link href="/terms" style={{ color: 'var(--primary)', fontWeight: 500 }}>Terms of Service →</Link>
            <Link href="/disclaimer" style={{ color: 'var(--primary)', fontWeight: 500 }}>Medical Disclaimer →</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
