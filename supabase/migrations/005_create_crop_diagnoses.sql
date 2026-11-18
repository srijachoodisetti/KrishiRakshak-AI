-- 005_create_crop_diagnoses.sql
-- KrishiRakshak AI: Crop Diagnosis History with Row Level Security (RLS)

CREATE TABLE IF NOT EXISTS public.crop_diagnoses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  farmer_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  crop_name TEXT NOT NULL,
  scientific_name TEXT,
  crop_identification_confidence NUMERIC NOT NULL DEFAULT 0.5,
  disease_name TEXT NOT NULL,
  disease_confidence NUMERIC NOT NULL DEFAULT 0.5,
  severity TEXT NOT NULL DEFAULT 'Low', -- 'Low' | 'Medium' | 'High'
  visible_symptoms JSONB NOT NULL DEFAULT '[]'::jsonb,
  observations JSONB NOT NULL DEFAULT '[]'::jsonb,
  recommendations JSONB NOT NULL DEFAULT '[]'::jsonb,
  is_uncertain BOOLEAN NOT NULL DEFAULT false,
  disclaimer TEXT,
  image_url TEXT, -- Base64 thumbnail or storage reference
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Index for speedy queries by farmer ordered by date
CREATE INDEX IF NOT EXISTS idx_crop_diagnoses_farmer_created 
  ON public.crop_diagnoses(farmer_id, created_at DESC);

-- Permissions
GRANT ALL ON TABLE public.crop_diagnoses TO authenticated;
GRANT SELECT ON TABLE public.crop_diagnoses TO anon;

-- Enable Row Level Security (RLS)
ALTER TABLE public.crop_diagnoses ENABLE ROW LEVEL SECURITY;

-- Clean up existing policies before creation
DROP POLICY IF EXISTS "Farmers can view their own diagnoses" ON public.crop_diagnoses;
DROP POLICY IF EXISTS "Farmers can insert their own diagnoses" ON public.crop_diagnoses;
DROP POLICY IF EXISTS "Farmers can delete their own diagnoses" ON public.crop_diagnoses;

-- SELECT policy: Farmer can only read their own diagnoses
CREATE POLICY "Farmers can view their own diagnoses"
  ON public.crop_diagnoses
  FOR SELECT
  TO authenticated
  USING (auth.uid() = farmer_id);

-- INSERT policy: Farmer can only insert records where farmer_id is their auth.uid()
CREATE POLICY "Farmers can insert their own diagnoses"
  ON public.crop_diagnoses
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = farmer_id);

-- DELETE policy: Farmer can only delete their own diagnoses
CREATE POLICY "Farmers can delete their own diagnoses"
  ON public.crop_diagnoses
  FOR DELETE
  TO authenticated
  USING (auth.uid() = farmer_id);

-- Trigger to update updated_at
DROP TRIGGER IF EXISTS on_crop_diagnoses_updated ON public.crop_diagnoses;
CREATE TRIGGER on_crop_diagnoses_updated
  BEFORE UPDATE ON public.crop_diagnoses
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();
