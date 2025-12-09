-- =============================================
-- مهدکودک رنگین‌کمان - Database Schema
-- =============================================

-- 1. جدول profiles (پروفایل کاربران)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  role TEXT DEFAULT 'parent' CHECK (role IN ('admin', 'parent')),
  avatar_url TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. جدول news_updates (اخبار و اطلاعیه‌ها)
CREATE TABLE IF NOT EXISTS public.news_updates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  published_at TIMESTAMPTZ DEFAULT NOW(),
  is_published BOOLEAN DEFAULT true,
  author_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. جدول children (اطلاعات کودکان)
CREATE TABLE IF NOT EXISTS public.children (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  birth_date DATE,
  age INTEGER,
  gender TEXT CHECK (gender IN ('male', 'female')),
  parent_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  class_name TEXT,
  enrollment_date DATE DEFAULT CURRENT_DATE,
  notes TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. جدول gallery (گالری تصاویر)
CREATE TABLE IF NOT EXISTS public.gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  caption TEXT,
  url TEXT NOT NULL,
  category TEXT DEFAULT 'general' CHECK (category IN ('general', 'events', 'classes', 'activities', 'facilities')),
  is_featured BOOLEAN DEFAULT false,
  uploaded_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- فعال‌سازی Row Level Security (RLS)
-- =============================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.children ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;

-- =============================================
-- تابع کمکی برای بررسی نقش ادمین
-- =============================================

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =============================================
-- Policies برای جدول profiles
-- =============================================

DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT
  USING (public.is_admin());

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Admins can update any profile" ON public.profiles;
CREATE POLICY "Admins can update any profile" ON public.profiles
  FOR UPDATE
  USING (public.is_admin());

-- =============================================
-- Policies برای جدول news_updates
-- =============================================

DROP POLICY IF EXISTS "Anyone can read published news" ON public.news_updates;
CREATE POLICY "Anyone can read published news" ON public.news_updates
  FOR SELECT
  USING (is_published = true);

DROP POLICY IF EXISTS "Admins can read all news" ON public.news_updates;
CREATE POLICY "Admins can read all news" ON public.news_updates
  FOR SELECT
  USING (public.is_admin());

DROP POLICY IF EXISTS "Admins can insert news" ON public.news_updates;
CREATE POLICY "Admins can insert news" ON public.news_updates
  FOR INSERT
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admins can update news" ON public.news_updates;
CREATE POLICY "Admins can update news" ON public.news_updates
  FOR UPDATE
  USING (public.is_admin());

DROP POLICY IF EXISTS "Admins can delete news" ON public.news_updates;
CREATE POLICY "Admins can delete news" ON public.news_updates
  FOR DELETE
  USING (public.is_admin());

-- =============================================
-- Policies برای جدول children
-- =============================================

DROP POLICY IF EXISTS "Parents can view own children" ON public.children;
CREATE POLICY "Parents can view own children" ON public.children
  FOR SELECT
  USING (auth.uid() = parent_id);

DROP POLICY IF EXISTS "Admins can view all children" ON public.children;
CREATE POLICY "Admins can view all children" ON public.children
  FOR SELECT
  USING (public.is_admin());

DROP POLICY IF EXISTS "Parents can insert own children" ON public.children;
CREATE POLICY "Parents can insert own children" ON public.children
  FOR INSERT
  WITH CHECK (auth.uid() = parent_id);

DROP POLICY IF EXISTS "Parents can update own children" ON public.children;
CREATE POLICY "Parents can update own children" ON public.children
  FOR UPDATE
  USING (auth.uid() = parent_id);

DROP POLICY IF EXISTS "Admins can insert any children" ON public.children;
CREATE POLICY "Admins can insert any children" ON public.children
  FOR INSERT
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admins can update any children" ON public.children;
CREATE POLICY "Admins can update any children" ON public.children
  FOR UPDATE
  USING (public.is_admin());

DROP POLICY IF EXISTS "Admins can delete any children" ON public.children;
CREATE POLICY "Admins can delete any children" ON public.children
  FOR DELETE
  USING (public.is_admin());

-- =============================================
-- Policies برای جدول gallery
-- =============================================

DROP POLICY IF EXISTS "Anyone can view gallery" ON public.gallery;
CREATE POLICY "Anyone can view gallery" ON public.gallery
  FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Admins can insert gallery" ON public.gallery;
CREATE POLICY "Admins can insert gallery" ON public.gallery
  FOR INSERT
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admins can update gallery" ON public.gallery;
CREATE POLICY "Admins can update gallery" ON public.gallery
  FOR UPDATE
  USING (public.is_admin());

DROP POLICY IF EXISTS "Admins can delete gallery" ON public.gallery;
CREATE POLICY "Admins can delete gallery" ON public.gallery
  FOR DELETE
  USING (public.is_admin());

-- =============================================
-- Trigger برای ایجاد خودکار پروفایل
-- =============================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'role', 'parent')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =============================================
-- Trigger برای به‌روزرسانی updated_at
-- =============================================

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_news_updates_updated_at ON public.news_updates;
CREATE TRIGGER update_news_updates_updated_at
  BEFORE UPDATE ON public.news_updates
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_children_updated_at ON public.children;
CREATE TRIGGER update_children_updated_at
  BEFORE UPDATE ON public.children
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =============================================
-- ایندکس‌ها برای بهبود عملکرد
-- =============================================

CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_children_parent_id ON public.children(parent_id);
CREATE INDEX IF NOT EXISTS idx_news_updates_published_at ON public.news_updates(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_news_updates_is_published ON public.news_updates(is_published);
CREATE INDEX IF NOT EXISTS idx_gallery_category ON public.gallery(category);
CREATE INDEX IF NOT EXISTS idx_gallery_is_featured ON public.gallery(is_featured);
