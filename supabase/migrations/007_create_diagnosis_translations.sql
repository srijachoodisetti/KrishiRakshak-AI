-- 007_create_diagnosis_translations.sql
-- KrishiRakshak AI: Zero External API Key Multilingual Diagnosis Translation Cache with Row Level Security (RLS)

CREATE TABLE IF NOT EXISTS public.diagnosis_translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  diagnosis_id UUID NOT NULL REFERENCES public.crop_diagnoses(id) ON DELETE CASCADE,
  farmer_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  target_language TEXT NOT NULL, -- 'en' | 'te' | 'hi'
  translated_diagnosis JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  CONSTRAINT uq_diagnosis_language UNIQUE (diagnosis_id, target_language)
);

-- Index for instant lookup of cached translation by diagnosis and language
CREATE INDEX IF NOT EXISTS idx_diagnosis_translations_lookup 
  ON public.diagnosis_translations(diagnosis_id, target_language);

-- Index for farmer queries
CREATE INDEX IF NOT EXISTS idx_diagnosis_translations_farmer 
  ON public.diagnosis_translations(farmer_id);

-- Permissions
GRANT ALL ON TABLE public.diagnosis_translations TO authenticated;
GRANT SELECT ON TABLE public.diagnosis_translations TO anon;

-- Enable Row Level Security (RLS)
ALTER TABLE public.diagnosis_translations ENABLE ROW LEVEL SECURITY;

-- Clean up existing policies before creation
DROP POLICY IF EXISTS "Farmers can view their own diagnosis translations" ON public.diagnosis_translations;
DROP POLICY IF EXISTS "Farmers can insert their own diagnosis translations" ON public.diagnosis_translations;
DROP POLICY IF EXISTS "Farmers can update their own diagnosis translations" ON public.diagnosis_translations;
DROP POLICY IF EXISTS "Farmers can delete their own diagnosis translations" ON public.diagnosis_translations;

-- SELECT policy: Farmer can only read translations for their own diagnoses
CREATE POLICY "Farmers can view their own diagnosis translations"
  ON public.diagnosis_translations
  FOR SELECT
  TO authenticated
  USING (
    auth.uid() = farmer_id 
    OR 
    EXISTS (
      SELECT 1 FROM public.crop_diagnoses cd 
      WHERE cd.id = diagnosis_translations.diagnosis_id 
      AND cd.farmer_id = auth.uid()
    )
  );

-- INSERT policy: Farmer can only insert if auth.uid() matches farmer_id AND owns the underlying diagnosis
CREATE POLICY "Farmers can insert their own diagnosis translations"
  ON public.diagnosis_translations
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = farmer_id
    AND
    EXISTS (
      SELECT 1 FROM public.crop_diagnoses cd 
      WHERE cd.id = diagnosis_translations.diagnosis_id 
      AND cd.farmer_id = auth.uid()
    )
  );

-- UPDATE policy: Farmer can update their own translation cache
CREATE POLICY "Farmers can update their own diagnosis translations"
  ON public.diagnosis_translations
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = farmer_id)
  WITH CHECK (auth.uid() = farmer_id);

-- DELETE policy: Farmer can delete their own translation cache
CREATE POLICY "Farmers can delete their own diagnosis translations"
  ON public.diagnosis_translations
  FOR DELETE
  TO authenticated
  USING (auth.uid() = farmer_id);

-- Trigger to update updated_at automatically
DROP TRIGGER IF EXISTS on_diagnosis_translations_updated ON public.diagnosis_translations;
CREATE TRIGGER on_diagnosis_translations_updated
  BEFORE UPDATE ON public.diagnosis_translations
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();
