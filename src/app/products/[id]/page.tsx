import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import AddToCartButton from '@/components/AddToCartButton';
import Link from 'next/link';
import { Metadata } from 'next';
import { Truck, RotateCcw, ShieldCheck, Check } from 'lucide-react';

export const revalidate = 60;

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const { data: product } = await supabase.from('products').select('*').eq('id', params.id).single();
  return {
    title: product ? `${product.name} | Shudhham` : 'Product Not Found',
    description: product?.description || 'Discover natural wellness at Shudhham.',
  };
}

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error || !product) {
    notFound();
  }

  // Fetch related products (same category)
  const { data: related } = await supabase
    .from('products')
    .select('*')
    .eq('category', product.category)
    .neq('id', product.id)
    .limit(4);

  return (
    <div className="page-padding" style={{ backgroundColor: 'var(--surface-container-low)', minHeight: '100vh' }}>
      <div className="container">
        
        {/* Breadcrumb */}
        <div style={{ marginBottom: '2rem', fontSize: '0.875rem', color: 'var(--on-surface-variant)', display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <Link href="/" style={{ color: 'var(--on-surface-variant)' }}>Home</Link>
          <span>›</span>
          <Link href="/products" style={{ color: 'var(--on-surface-variant)' }}>Apothecary</Link>
          <span>›</span>
          <Link href={`/products?category=${encodeURIComponent(product.category)}`} style={{ color: 'var(--on-surface-variant)' }}>{product.category}</Link>
          <span>›</span>
          <span style={{ color: 'var(--primary)', fontWeight: 600 }}>{product.name}</span>
        </div>

        <div className="responsive-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '4rem', alignItems: 'start' }}>
          
          {/* Left: Images */}
          <div style={{ 
            aspectRatio: '1', 
            backgroundColor: 'var(--surface)', 
            borderRadius: 'var(--radius-xl)', 
            overflow: 'hidden',
            boxShadow: 'var(--shadow-md)',
            position: 'sticky',
            top: '100px'
          }}>
            {product.image_url ? (
              <img src={product.image_url} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--on-surface-variant)' }}>Preview Unavailable</div>
            )}
          </div>

          {/* Right: Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600 }}>
                {product.category}
              </span>
              <h1 className="heading-display" style={{ marginTop: '0.75rem', fontSize: '2.5rem', lineHeight: 1.1 }}>{product.name}</h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem' }}>
                <div style={{ color: '#D4A574', letterSpacing: '2px', fontSize: '1.125rem' }}>★★★★★</div>
                <span style={{ fontSize: '0.875rem', color: 'var(--on-surface-variant)', textDecoration: 'underline' }}>(24 verified reviews)</span>
              </div>
            </div>

            <p style={{ fontSize: '1.75rem', fontFamily: 'var(--font-noto-serif)', color: 'var(--primary)', fontWeight: 700 }}>
              ₹{product.price}
              <span style={{ fontSize: '1rem', color: 'var(--on-surface-variant)', fontWeight: 400, marginLeft: '0.5rem', textDecoration: 'line-through' }}>₹{Math.round(product.price * 1.2)}</span>
            </p>

            <p style={{ lineHeight: 1.7, color: 'var(--on-surface-variant)', fontSize: '1.0625rem' }}>
              {product.description || "Our premium botanical extract is carefully sourced to ensure maximum potency and purity. Traditionally used in Ayurvedic practices for its restorative, balancing, and rejuvenating properties."}
            </p>

            <div style={{ borderTop: '1px solid var(--outline-variant)', borderBottom: '1px solid var(--outline-variant)', padding: '1.5rem 0' }}>
              <h4 className="heading-title" style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>Key Benefits</h4>
              <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '0.75rem', color: 'var(--on-surface-variant)', fontSize: '0.9375rem' }}>
                <li style={{ display: 'flex', gap: '0.75rem' }}><span style={{ color: 'var(--primary)' }}><Check size={16} /></span> 100% Organic & Ethically Sourced</li>
                <li style={{ display: 'flex', gap: '0.75rem' }}><span style={{ color: 'var(--primary)' }}><Check size={16} /></span> Rich in natural antioxidants & adaptogens</li>
                <li style={{ display: 'flex', gap: '0.75rem' }}><span style={{ color: 'var(--primary)' }}><Check size={16} /></span> Supports holistic immune system function</li>
                <li style={{ display: 'flex', gap: '0.75rem' }}><span style={{ color: 'var(--primary)' }}><Check size={16} /></span> No artificial fillers, colors, or preservatives</li>
              </ul>
            </div>

            <div style={{ marginTop: '0.5rem' }}>
              <AddToCartButton product={product} />
            </div>
            
            <div style={{ display: 'flex', gap: '2rem', fontSize: '0.875rem', marginTop: '1rem', color: 'var(--on-surface-variant)', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Truck size={20} style={{ color: 'var(--primary)' }} /> Free Shipping in India
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <RotateCcw size={20} style={{ color: 'var(--primary)' }} /> 30-Day Easy Returns
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ShieldCheck size={20} style={{ color: 'var(--primary)' }} /> Secure Checkout
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related && related.length > 0 && (
          <section style={{ marginTop: '6rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <span style={{ color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.75rem', fontWeight: 600 }}>Curated</span>
                <h2 className="heading-headline" style={{ marginTop: '0.5rem' }}>Pairs Well With</h2>
              </div>
            </div>
            
            <div className="responsive-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.5rem' }}>
              {related.map((item: any) => (
                <Link key={item.id} href={`/products/${item.id}`} style={{ backgroundColor: 'var(--surface)', padding: '1.25rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', transition: 'transform 0.2s', display: 'block' }}>
                  <div style={{ aspectRatio: '1', backgroundColor: 'var(--surface-container-highest)', borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: '1.25rem' }}>
                    {item.image_url && <img src={item.image_url} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                  </div>
                  <span style={{ fontSize: '0.6875rem', color: 'var(--secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>{item.category}</span>
                  <h3 style={{ fontSize: '1rem', marginTop: '0.25rem', marginBottom: '0.5rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</h3>
                  <p style={{ color: 'var(--primary)', fontWeight: 600 }}>₹{item.price}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
