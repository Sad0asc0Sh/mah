-- Create storage bucket for kindergarten files
INSERT INTO storage.buckets (id, name, public)
VALUES ('kindergarten', 'kindergarten', true)
ON CONFLICT (id) DO NOTHING;

-- Policy: Anyone can view files (public bucket)
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
CREATE POLICY "Public Access" ON storage.objects
  FOR SELECT
  USING (bucket_id = 'kindergarten');

-- Policy: Authenticated users can upload
DROP POLICY IF EXISTS "Authenticated users can upload" ON storage.objects;
CREATE POLICY "Authenticated users can upload" ON storage.objects
  FOR INSERT
  WITH CHECK (
    bucket_id = 'kindergarten' 
    AND auth.role() = 'authenticated'
  );

-- Policy: Users can update their own uploads or admins can update any
DROP POLICY IF EXISTS "Users can update own files" ON storage.objects;
CREATE POLICY "Users can update own files" ON storage.objects
  FOR UPDATE
  USING (
    bucket_id = 'kindergarten' 
    AND (
      auth.uid() = owner
      OR EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND role = 'admin'
      )
    )
  );

-- Policy: Admins can delete files
DROP POLICY IF EXISTS "Admins can delete files" ON storage.objects;
CREATE POLICY "Admins can delete files" ON storage.objects
  FOR DELETE
  USING (
    bucket_id = 'kindergarten' 
    AND EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );
