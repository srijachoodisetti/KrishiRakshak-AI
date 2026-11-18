-- 006_create_crop_treatments.sql
-- KrishiRakshak AI: Crop Solution Advisor & Treatment Records with Row Level Security (RLS)

CREATE TABLE IF NOT EXISTS public.crop_treatments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  farmer_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  farm_id UUID REFERENCES public.farms(id) ON DELETE SET NULL,
  crop_id UUID REFERENCES public.crops(id) ON DELETE SET NULL,
  diagnosis_id UUID REFERENCES public.crop_diagnoses(id) ON DELETE SET NULL,
  treatment_name TEXT NOT NULL,
  treatment_type TEXT NOT NULL, -- 'Organic / Biological' | 'Chemical Management' | 'Cultural / Sanitation' | 'Other'
  application_date DATE NOT NULL DEFAULT CURRENT_DATE,
  dosage_or_method TEXT,
  observations TEXT,
  follow_up_date_3d DATE,
  follow_up_date_7d DATE,
  recovery_status TEXT DEFAULT 'Under Monitoring', -- 'Under Monitoring' | 'Recovering' | 'Resolved' | 'Needs Follow-up'
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Indices for performance
CREATE INDEX IF NOT EXISTS idx_crop_treatments_farmer_date 
  ON public.crop_treatments(farmer_id, application_date DESC);
CREATE INDEX IF NOT EXISTS idx_crop_treatments_diagnosis 
  ON public.crop_treatments(diagnosis_id);

-- Grants
GRANT ALL ON TABLE public.crop_treatments TO authenticated;
GRANT SELECT ON TABLE public.crop_treatments TO anon;

-- Enable Row Level Security (RLS)
ALTER TABLE public.crop_treatments ENABLE ROW LEVEL SECURITY;

-- Clean up existing policies before recreation
DROP POLICY IF EXISTS "Farmers can view their own crop treatments" ON public.crop_treatments;
DROP POLICY IF EXISTS "Farmers can insert their own crop treatments" ON public.crop_treatments;
DROP POLICY IF EXISTS "Farmers can update their own crop treatments" ON public.crop_treatments;
DROP POLICY IF EXISTS "Farmers can delete their own crop treatments" ON public.crop_treatments;

-- SELECT policy: Farmer can only view their own treatments
CREATE POLICY "Farmers can view their own crop treatments"
  ON public.crop_treatments
  FOR SELECT
  TO authenticated
  USING (auth.uid() = farmer_id);

-- INSERT policy: Farmer can only insert treatments with auth.uid() = farmer_id
CREATE POLICY "Farmers can insert their own crop treatments"
  ON public.crop_treatments
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = farmer_id);

-- UPDATE policy: Farmer can update their own treatments
CREATE POLICY "Farmers can update their own crop treatments"
  ON public.crop_treatments
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = farmer_id)
  WITH CHECK (auth.uid() = farmer_id);

-- DELETE policy: Farmer can delete their own treatments
CREATE POLICY "Farmers can delete their own crop treatments"
  ON public.crop_treatments
  FOR DELETE
  TO authenticated
  USING (auth.uid() = farmer_id);

-- Trigger for updated_at
DROP TRIGGER IF EXISTS on_crop_treatments_updated ON public.crop_treatments;
CREATE TRIGGER on_crop_treatments_updated
  BEFORE UPDATE ON public.crop_treatments
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();
