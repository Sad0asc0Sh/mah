-- Create storage bucket for kindergarten media
INSERT INTO storage.buckets (id, name, public)
VALUES ('kindergarten', 'kindergarten', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to kindergarten bucket
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
CREATE POLICY "Public Access" ON storage.objects
  FOR SELECT
  USING (bucket_id = 'kindergarten');

-- Allow authenticated users to upload to kindergarten bucket (admin only)
DROP POLICY IF EXISTS "Authenticated users can upload" ON storage.objects;
CREATE POLICY "Authenticated users can upload" ON storage.objects
  FOR INSERT
  WITH CHECK (
    bucket_id = 'kindergarten' 
    AND auth.role() = 'authenticated'
    AND EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Allow admins to delete from kindergarten bucket
DROP POLICY IF EXISTS "Admins can delete" ON storage.objects;
CREATE POLICY "Admins can delete" ON storage.objects
  FOR DELETE
  USING (
    bucket_id = 'kindergarten'
    AND EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );
