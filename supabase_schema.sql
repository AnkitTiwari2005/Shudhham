-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
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

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  email TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Function to handle profile creation on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', new.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile after signup
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert seed data for products
INSERT INTO products (name, description, price, category, image_url)
VALUES 
  ('Ashwagandha Root Powder', 'Premium grade Ashwagandha root powder for stress relief and vitality.', 449, 'Immunity & Health', 'https://images.unsplash.com/photo-1611078864757-5e640b7933b9?q=80&w=600&auto=format&fit=crop'),
  ('Turmeric Golden Milk', 'Traditional Ayurvedic blend for immunity and inflammation support.', 299, 'Immunity & Health', 'https://images.unsplash.com/photo-1610444589204-749e79430c6a?q=80&w=600&auto=format&fit=crop'),
  ('Tulsi Drops', 'Pure Tulsi extract for respiratory health and daily immunity.', 199, 'Immunity & Health', 'https://images.unsplash.com/photo-1596541530948-26615b3c5836?q=80&w=600&auto=format&fit=crop'),
  ('Brahmi Leaf Powder', 'Cognitive support and memory enhancement natural powder.', 349, 'Mental Wellness', 'https://images.unsplash.com/photo-1588636402360-128da40db95e?q=80&w=600&auto=format&fit=crop'),
  ('Saffron Glow Face Oil', 'Pure Kashmiri saffron infused oil for radiant and clear skin.', 899, 'Skin & Beauty', 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=600&auto=format&fit=crop'),
  ('Rose Water Mist', 'Triple-distilled damask rose water for hydration and toning.', 349, 'Skin & Beauty', 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=600&auto=format&fit=crop')
ON CONFLICT (name) DO NOTHING;
