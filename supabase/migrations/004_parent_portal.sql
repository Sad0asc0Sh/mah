CREATE TABLE IF NOT EXISTS public.children (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  parent_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  birth_date DATE,
  avatar_url TEXT,
  class_name TEXT,
  notes TEXT
);

CREATE TABLE IF NOT EXISTS public.daily_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  child_id UUID NOT NULL REFERENCES public.children(id) ON DELETE CASCADE,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  mood TEXT CHECK (mood IN ('happy', 'calm', 'sleepy', 'crying', 'playful')),
  food_intake TEXT CHECK (food_intake IN ('full', 'half', 'none', 'good')),
  sleep_quality TEXT CHECK (sleep_quality IN ('good', 'fair', 'poor', 'none')),
  activity TEXT,
  teacher_note TEXT,
  created_by UUID REFERENCES auth.users(id)
);

CREATE INDEX IF NOT EXISTS idx_children_parent_id ON public.children(parent_id);
CREATE INDEX IF NOT EXISTS idx_daily_reports_child_id ON public.daily_reports(child_id);
CREATE INDEX IF NOT EXISTS idx_daily_reports_date ON public.daily_reports(date);

ALTER TABLE public.children ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_reports ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Parents can view their own children" ON public.children;
CREATE POLICY "Parents can view their own children" ON public.children
  FOR SELECT USING (parent_id = auth.uid());

DROP POLICY IF EXISTS "Admins can manage all children" ON public.children;
CREATE POLICY "Admins can manage all children" ON public.children
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

DROP POLICY IF EXISTS "Parents can view their children reports" ON public.daily_reports;
CREATE POLICY "Parents can view their children reports" ON public.daily_reports
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.children 
      WHERE children.id = daily_reports.child_id 
      AND children.parent_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Admins can manage all reports" ON public.daily_reports;
CREATE POLICY "Admins can manage all reports" ON public.daily_reports
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );
