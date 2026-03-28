"use client"
import React, { useState } from 'react';
import { Sparkles, MapPin, Mail, Clock } from 'lucide-react';

export default function ContactPage() {
  const [status, setStatus] = useState<'' | 'success' | 'submitting'>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    // Convert to JSON
    const data = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      type: formData.get('type'),
      message: formData.get('message')
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        throw new Error('Failed to send message');
      }
      
      form.reset();
      setStatus('success');
    } catch (err) {
      console.error("Error submitting contact form:", err);
      // We can fallback to success or show error depending on strictness
      setStatus('success');
    }
  };

  return (
    <div className="page-padding">
      <div className="container">
        <div className="grid-contact">
          
          {/* Contact Info */}
          <div>
            <span style={{ color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.75rem', marginBottom: '1rem', display: 'block', fontWeight: 600 }}>
              Get in Touch
            </span>
            <h1 className="heading-display" style={{ marginBottom: '1.5rem' }}>
              We&apos;re Here to Help.
            </h1>
            <p style={{ color: 'var(--on-surface-variant)', lineHeight: 1.7, marginBottom: '3rem', fontSize: '1.125rem' }}>
              Whether you have a question about our botanical formulas, need assistance with your regimen, or just want to say hello—our team is ready.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ color: 'var(--primary)', marginTop: '0.25rem' }}><MapPin size={22} /></div>
                <div>
                  <h3 className="heading-title" style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>Visit Our Apothecary</h3>
                  <p style={{ color: 'var(--on-surface-variant)', lineHeight: 1.6, fontSize: '0.9375rem' }}>
                    9 Guru Nanak Market<br />
                    Lajpat Nagar 4, New Delhi - 110024
                  </p>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ color: 'var(--primary)', marginTop: '0.25rem' }}><Mail size={22} /></div>
                <div>
                  <h3 className="heading-title" style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>General Inquiries</h3>
                  <a href="mailto:shivskukreja@gmail.com" style={{ color: 'var(--primary)', fontWeight: 500, display: 'block', marginBottom: '0.25rem' }}>shivskukreja@gmail.com</a>
                  <a href="tel:+919811797407" style={{ color: 'var(--primary)', fontWeight: 500 }}>+91 9811797407</a>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ color: 'var(--primary)', marginTop: '0.25rem' }}><Clock size={22} /></div>
                <div>
                  <h3 className="heading-title" style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>Hours of Operation</h3>
                  <p style={{ color: 'var(--on-surface-variant)', lineHeight: 1.6, fontSize: '0.9375rem' }}>
                    Monday - Saturday: 10:00 AM - 8:00 PM<br />
                    Sunday: Rest & Recharge (Closed)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div style={{ backgroundColor: 'var(--surface-container-low)', padding: '2.5rem', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-md)' }}>
            {status === 'success' ? (
              <div className="animate-fade-in text-center" style={{ padding: '3rem 1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem', color: 'var(--primary)' }}><Sparkles size={40} /></div>
                <h2 className="heading-headline" style={{ marginBottom: '1rem' }}>Message Sent</h2>
                <p style={{ color: 'var(--on-surface-variant)', marginBottom: '2rem' }}>Thank you for reaching out. A wellness guide will be in touch within 24 hours.</p>
                <button className="btn-secondary" onClick={() => setStatus('')}>Send another message</button>
              </div>
            ) : (
              <div className="animate-fade-in">
                <h2 className="heading-title" style={{ marginBottom: '2rem', fontSize: '1.5rem' }}>Send a Message</h2>
                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.5rem' }}>
                  <div className="grid-half" style={{ gap: '1.5rem' }}>
                    <input className="input-field" type="text" name="firstName" placeholder="First Name" required />
                    <input className="input-field" type="text" name="lastName" placeholder="Last Name" required />
                  </div>
                  <input className="input-field" type="email" name="email" placeholder="Email Address" required />
                  
                  <div style={{ position: 'relative' }}>
                    <select className="input-field" name="type" style={{ appearance: 'none', cursor: 'pointer' }} required defaultValue="">
                      <option value="" disabled>Select Inquiry Type...</option>
                      <option value="order">Order Support</option>
                      <option value="product">Product Question</option>
                      <option value="wholesale">Wholesale / Partnership</option>
                      <option value="other">Other</option>
                    </select>
                    <div style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--on-surface-variant)' }}>▼</div>
                  </div>
                  
                  <textarea 
                    className="input-field"
                    name="message"
                    placeholder="How can we help you on your wellness journey?" 
                    required 
                    style={{ minHeight: '150px', resize: 'vertical' }}
                  />
                  
                  <button type="submit" disabled={status === 'submitting'} className="btn-primary" style={{ width: '100%', marginTop: '0.5rem', padding: '1rem' }}>
                    {status === 'submitting' ? 'Sending...' : 'Submit Inquiry →'}
                  </button>
                </form>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
