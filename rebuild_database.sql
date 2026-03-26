-- ============================================================
-- SHUDHHAM: COMPLETE DATABASE REBUILD
-- Run this ENTIRE script in Supabase SQL Editor (single execution)
-- ============================================================

-- ─── 1. DROP EVERYTHING ───
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS addresses CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP FUNCTION IF EXISTS handle_new_user() CASCADE;

-- ─── 2. CREATE TABLES ───

-- Products
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC NOT NULL DEFAULT 0,
  category TEXT NOT NULL DEFAULT 'Uncategorized',
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Profiles (linked to auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  phone TEXT,
  age INTEGER,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Addresses
CREATE TABLE addresses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  address_line1 TEXT NOT NULL,
  address_line2 TEXT,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  pin_code TEXT NOT NULL,
  phone TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Orders
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  total_amount NUMERIC NOT NULL DEFAULT 0,
  full_name TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  pin_code TEXT,
  status TEXT DEFAULT 'processing',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Order Items
CREATE TABLE order_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE NOT NULL,
  product_id UUID,
  product_name TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  price NUMERIC NOT NULL DEFAULT 0
);

-- ─── 3. GRANT TABLE PERMISSIONS TO ROLES ───
-- This is REQUIRED! Without these, RLS policies alone won't work.

-- anon role (unauthenticated visitors) — read products only
GRANT SELECT ON products TO anon;

-- authenticated role (logged-in users) — full CRUD where RLS allows
GRANT SELECT ON products TO authenticated;

GRANT SELECT, INSERT, UPDATE ON profiles TO authenticated;

GRANT SELECT, INSERT, DELETE ON addresses TO authenticated;

GRANT SELECT, INSERT ON orders TO authenticated;

GRANT SELECT, INSERT ON order_items TO authenticated;

-- ─── 4. AUTO-CREATE PROFILE ON SIGNUP ───

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, created_at, updated_at)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.raw_user_meta_data ->> 'name', ''),
    now(),
    now()
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ─── 5. CREATE PROFILES FOR EXISTING AUTH USERS ───

INSERT INTO public.profiles (id, email, created_at, updated_at)
SELECT id, email, created_at, now()
FROM auth.users
WHERE id NOT IN (SELECT id FROM public.profiles)
ON CONFLICT (id) DO NOTHING;

-- ─── 6. ROW LEVEL SECURITY ───

ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Products: anyone can read
CREATE POLICY "Products are publicly readable" ON products FOR SELECT USING (true);

-- Profiles: users can read, insert, and update their own profile
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Addresses: users manage their own
CREATE POLICY "Users can view own addresses" ON addresses FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own addresses" ON addresses FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own addresses" ON addresses FOR DELETE USING (auth.uid() = user_id);

-- Orders: users can read and create
CREATE POLICY "Users can view own orders" ON orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own orders" ON orders FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Order Items: users can read and create via order ownership
CREATE POLICY "Users can view own order items" ON order_items FOR SELECT 
  USING (EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid()));
CREATE POLICY "Users can insert own order items" ON order_items FOR INSERT 
  WITH CHECK (EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid()));

-- ─── 7. SEED PRODUCTS ───

INSERT INTO products (name, description, price, category, image_url) VALUES
  ('Ashwagandha Root Powder', 'Premium grade Ashwagandha root powder, traditionally used for stress relief, enhanced vitality, and balanced energy levels.', 449, 'Immunity & Health', 'https://images.unsplash.com/photo-1515694346937-b97183c03e09?w=600&auto=format&fit=crop'),
  ('Turmeric Golden Milk', 'Traditional Ayurvedic golden milk blend with turmeric, black pepper, and warming spices for anti-inflammatory support.', 299, 'Immunity & Health', 'https://images.unsplash.com/photo-1615485500710-aa71300612aa?w=600&auto=format&fit=crop'),
  ('Tulsi Immunity Drops', 'Pure Tulsi extract drops for natural immune support and respiratory wellness.', 199, 'Immunity & Health', 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&auto=format&fit=crop'),
  ('Amla Vitamin C Tablets', 'Natural vitamin C from Indian Gooseberry for powerful antioxidant protection.', 349, 'Immunity & Health', 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=600&auto=format&fit=crop'),
  ('Brahmi Leaf Powder', 'Traditional cognitive enhancement powder for focus, memory, and mental clarity.', 399, 'Mental Wellness', 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&auto=format&fit=crop'),
  ('Shankhpushpi Syrup', 'Ayurvedic brain tonic for enhanced concentration and a calm, peaceful mind.', 249, 'Mental Wellness', 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop'),
  ('Calm Mind Capsules', 'A blend of Jatamansi, Brahmi, and Ashwagandha for stress relief and restful sleep.', 499, 'Mental Wellness', 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop'),
  ('Saffron Glow Face Oil', 'Luxurious face oil infused with Kumkumadi Tailam for radiant, glowing skin.', 799, 'Skin & Beauty', 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&auto=format&fit=crop'),
  ('Neem Purifying Mask', 'Deep cleansing face mask with Neem and Multani Mitti for clear, blemish-free skin.', 349, 'Skin & Beauty', 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=600&auto=format&fit=crop'),
  ('Aloe Vera Gel', 'Pure, cold-pressed Aloe Vera gel for soothing hydration and skin repair.', 199, 'Skin & Beauty', 'https://images.unsplash.com/photo-1556228720-195a672e68b0?w=600&auto=format&fit=crop'),
  ('Chamomile Dream Tea', 'Calming herbal tea blend with Chamomile, Lavender, and Lemon Balm for restful evenings.', 249, 'Herbal Teas', 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&auto=format&fit=crop'),
  ('Tulsi Green Tea', 'Classic green tea elevated with Holy Basil for a refreshing, antioxidant-rich brew.', 199, 'Herbal Teas', 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=600&auto=format&fit=crop');

-- ─── DONE! ───
-- Your database is now fully set up with tables, grants, RLS policies, triggers, and products.
