import { supabase, seedProductsIfEmpty } from '@/lib/supabase';
import ProductCard from '@/components/ProductCard';

export const revalidate = 0;

export default async function ProductsPage({ searchParams }: { searchParams: { category?: string } }) {
  await seedProductsIfEmpty();

  let query = supabase.from('products').select('*');
  
  const currentCategory = searchParams.category;

  if (currentCategory) {
    const categoryMapping: Record<string, string> = {
      'immunity': 'Immunity & Health',
      'mental': 'Mental Wellness',
      'skin': 'Skin & Beauty',
      'teas': 'Herbal Teas'
    };
    const dbCategory = categoryMapping[currentCategory] || currentCategory;
    query = query.eq('category', dbCategory);
  }

  const { data: products } = await query;

  const filterTabs = [
    { label: 'All', value: '' },
    { label: 'Immunity & Health', value: 'immunity' },
    { label: 'Mental Wellness', value: 'mental' },
    { label: 'Skin & Beauty', value: 'skin' },
    { label: 'Herbal Teas', value: 'teas' },
  ];

  return (
    <div className="page-padding">
      <div className="container">
        <header style={{ textAlign: 'center', marginBottom: '4rem', maxWidth: '600px', margin: '0 auto 4rem auto' }}>
          <h1 className="heading-display">The Apothecary</h1>
          <p style={{ color: 'var(--on-surface-variant)', marginTop: '1rem' }}>
            Explore our collection of natural remedies, carefully sourced to support your holistic wellbeing.
          </p>
        </header>

        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '3.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {filterTabs.map(tab => (
            <a 
              key={tab.label}
              href={tab.value ? `/products?category=${tab.value}` : '/products'} 
              className={(currentCategory || '') === tab.value ? 'btn-primary' : 'btn-secondary'} 
              style={{ padding: '0.5rem 1.25rem', fontSize: '14px', width: 'auto' }}
            >
              {tab.label}
            </a>
          ))}
        </div>

        <div className="grid-products" style={{ gap: '2rem' }}>
          {products?.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        {(!products || products.length === 0) && (
          <div style={{ textAlign: 'center', padding: '6rem 0', color: 'var(--on-surface-variant)' }}>
            <p style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>No products found in this category.</p>
            <a href="/products" className="btn-secondary" style={{ width: 'auto' }}>Show All Products</a>
          </div>
        )}
      </div>
    </div>
  );
}
