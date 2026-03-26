import { createClient } from '@supabase/supabase-js'
import { createBrowserClient } from '@supabase/ssr'

export type Database = any

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Server-side client for simple data fetching
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

// Browser client that syncs with cookies for auth
export function createClientSupabase() {
  return createBrowserClient<Database>(supabaseUrl, supabaseAnonKey)
}

// Seed the products table if empty (fallback for when SQL script hasn't been run)
export async function seedProductsIfEmpty() {
  const { data, error } = await supabase.from('products').select('id').limit(1);
  
  // Table doesn't exist or other error
  if (error) return false;
  
  // Table exists but is empty — seed it
  if (data && data.length === 0) {
    const products = [
      { name: 'Ashwagandha Root Powder', description: 'Premium grade Ashwagandha root powder, traditionally used for stress relief and vitality.', price: 449, category: 'Immunity & Health', image_url: 'https://images.unsplash.com/photo-1515694346937-b97183c03e09?w=600&auto=format&fit=crop' },
      { name: 'Turmeric Golden Milk', description: 'Traditional Ayurvedic golden milk blend with turmeric, black pepper, and warming spices.', price: 299, category: 'Immunity & Health', image_url: 'https://images.unsplash.com/photo-1615485500710-aa71300612aa?w=600&auto=format&fit=crop' },
      { name: 'Tulsi Immunity Drops', description: 'Pure Tulsi extract drops for natural immune support and respiratory wellness.', price: 199, category: 'Immunity & Health', image_url: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&auto=format&fit=crop' },
      { name: 'Amla Vitamin C Tablets', description: 'Natural vitamin C from Indian Gooseberry for powerful antioxidant protection.', price: 349, category: 'Immunity & Health', image_url: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=600&auto=format&fit=crop' },
      { name: 'Brahmi Leaf Powder', description: 'Traditional cognitive enhancement powder for focus, memory, and mental clarity.', price: 399, category: 'Mental Wellness', image_url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&auto=format&fit=crop' },
      { name: 'Shankhpushpi Syrup', description: 'Ayurvedic brain tonic for enhanced concentration and a calm, peaceful mind.', price: 249, category: 'Mental Wellness', image_url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop' },
      { name: 'Calm Mind Capsules', description: 'A blend of Jatamansi, Brahmi, and Ashwagandha for stress relief and restful sleep.', price: 499, category: 'Mental Wellness', image_url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop' },
      { name: 'Saffron Glow Face Oil', description: 'Luxurious face oil infused with Kumkumadi Tailam for radiant, glowing skin.', price: 799, category: 'Skin & Beauty', image_url: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&auto=format&fit=crop' },
      { name: 'Neem Purifying Mask', description: 'Deep cleansing face mask with Neem and Multani Mitti for clear, blemish-free skin.', price: 349, category: 'Skin & Beauty', image_url: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=600&auto=format&fit=crop' },
      { name: 'Aloe Vera Gel', description: 'Pure, cold-pressed Aloe Vera gel for soothing hydration and skin repair.', price: 199, category: 'Skin & Beauty', image_url: 'https://images.unsplash.com/photo-1556228720-195a672e68b0?w=600&auto=format&fit=crop' },
      { name: 'Chamomile Dream Tea', description: 'Calming herbal tea blend with Chamomile, Lavender, and Lemon Balm for restful evenings.', price: 249, category: 'Herbal Teas', image_url: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&auto=format&fit=crop' },
      { name: 'Tulsi Green Tea', description: 'Classic green tea elevated with Holy Basil for a refreshing, antioxidant-rich brew.', price: 199, category: 'Herbal Teas', image_url: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=600&auto=format&fit=crop' },
    ];
    await supabase.from('products').insert(products);
  }
  return true;
}
