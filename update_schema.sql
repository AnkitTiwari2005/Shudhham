-- We need to add age and phone to the profiles table
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS age INTEGER;

-- Enable Row Level Security broadly if not already done
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Products: anyone can read
DO $$ BEGIN
    CREATE POLICY "Products are viewable by everyone" ON public.products FOR SELECT USING (true);
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;

-- Profiles: users can read and update only their own
DO $$ BEGIN
    CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
    CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
    CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;

-- Addresses: users can view, create, delete their own
DO $$ BEGIN
    CREATE POLICY "Users can view own addresses" ON public.addresses FOR SELECT USING (auth.uid() = user_id);
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
    CREATE POLICY "Users can create own addresses" ON public.addresses FOR INSERT WITH CHECK (auth.uid() = user_id);
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
    CREATE POLICY "Users can update own addresses" ON public.addresses FOR UPDATE USING (auth.uid() = user_id);
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
    CREATE POLICY "Users can delete own addresses" ON public.addresses FOR DELETE USING (auth.uid() = user_id);
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;

-- Orders & Items: users can view and create their own
DO $$ BEGIN
    CREATE POLICY "Users can view own orders" ON public.orders FOR SELECT USING (auth.uid() = user_id);
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
    CREATE POLICY "Users can create own orders" ON public.orders FOR INSERT WITH CHECK (auth.uid() = user_id);
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
    CREATE POLICY "Users can view own order items" ON public.order_items FOR SELECT USING (
        EXISTS (SELECT 1 FROM public.orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid())
    );
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
    CREATE POLICY "Users can create own order items" ON public.order_items FOR INSERT WITH CHECK (
        EXISTS (SELECT 1 FROM public.orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid())
    );
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;

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
