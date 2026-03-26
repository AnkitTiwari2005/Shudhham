const { Client } = require('pg');
require('dotenv').config({ path: '.env.local' });

const client = new Client({
  connectionString: process.env.DATABASE_URL
});

async function main() {
  await client.connect();
  
  const sql = `
    -- Create products table
    CREATE TABLE IF NOT EXISTS products (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name TEXT NOT NULL,
      description TEXT,
      price INTEGER NOT NULL,
      image_url TEXT,
      category TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
    );

    -- Create addresses table
    CREATE TABLE IF NOT EXISTS addresses (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID REFERENCES auth.users(id),
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      address_line1 TEXT NOT NULL,
      address_line2 TEXT,
      city TEXT NOT NULL,
      state TEXT NOT NULL,
      pin_code TEXT NOT NULL,
      phone TEXT NOT NULL,
      is_default BOOLEAN DEFAULT false,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
    );

    -- Create orders table
    CREATE TABLE IF NOT EXISTS orders (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID REFERENCES auth.users(id),
      total_amount INTEGER NOT NULL,
      status TEXT DEFAULT 'processing',
      shipping_address_id UUID REFERENCES addresses(id),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
    );

    -- Create order items table
    CREATE TABLE IF NOT EXISTS order_items (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
      product_id UUID REFERENCES products(id),
      quantity INTEGER NOT NULL,
      price_at_time INTEGER NOT NULL
    );

    -- We avoid duplicate inserts using a unique constraint. First, add unique constraint to product name.
    DO $$
    BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'products_name_key') THEN
        ALTER TABLE products ADD CONSTRAINT products_name_key UNIQUE (name);
      END IF;
    END;
    $$;

    -- Insert seed data for products
    INSERT INTO products (name, description, price, category, image_url)
    VALUES 
      ('Ashwagandha Root Powder', 'Premium grade Ashwagandha root powder for stress relief and vitality.', 449, 'Immunity & Health', 'https://images.unsplash.com/photo-1611078864757-5e640b7933b9?q=80&w=600&auto=format&fit=crop'),
      ('Turmeric Golden Milk', 'Traditional Ayurvedic blend for immunity and inflammation support.', 299, 'Immunity & Health', 'https://images.unsplash.com/photo-1610444589204-749e79430c6a?q=80&w=600&auto=format&fit=crop'),
      ('Tulsi Drops', 'Pure Tulsi extract for respiratory health and daily immunity.', 199, 'Immunity & Health', 'https://images.unsplash.com/photo-1596541530948-26615b3c5836?q=80&w=600&auto=format&fit=crop'),
      ('Brahmi Leaf Powder', 'Cognitive support and memory enhancement natural powder.', 349, 'Mental Wellness', 'https://images.unsplash.com/photo-1588636402360-128da40db95e?q=80&w=600&auto=format&fit=crop')
    ON CONFLICT (name) DO NOTHING;
  `;

  try {
    await client.query(sql);
    console.log('Database initialized successfully with seeded products.');
  } catch (err) {
    console.error('Error initializing DB:', err);
  } finally {
    await client.end();
  }
}

main();
