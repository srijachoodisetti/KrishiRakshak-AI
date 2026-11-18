-- 003_create_crops.sql
-- KrishiRakshak AI: Crops table with Row Level Security (RLS) and Role Grants

CREATE TABLE IF NOT EXISTS public.crops (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  farmer_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  farm_id UUID NOT NULL REFERENCES public.farms(id) ON DELETE CASCADE,
  crop_name TEXT NOT NULL,
  variety TEXT,
  sowing_date DATE,
  expected_harvest_date DATE,
  cultivated_area NUMERIC NOT NULL,
  growth_stage TEXT,
  irrigation_method TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Grant Table Permissions
GRANT ALL ON TABLE public.crops TO authenticated;
GRANT SELECT ON TABLE public.crops TO anon;

-- Enable Row Level Security (RLS)
ALTER TABLE public.crops ENABLE ROW LEVEL SECURITY;

-- Clean up existing policies before recreation
DROP POLICY IF EXISTS "Farmers can view their own crops" ON public.crops;
DROP POLICY IF EXISTS "Farmers can insert their own crops" ON public.crops;
DROP POLICY IF EXISTS "Farmers can update their own crops" ON public.crops;
DROP POLICY IF EXISTS "Farmers can delete their own crops" ON public.crops;

-- SELECT policy
CREATE POLICY "Farmers can view their own crops"
  ON public.crops
  FOR SELECT
  TO authenticated
  USING (
    auth.uid() = farmer_id 
    AND EXISTS (
      SELECT 1 FROM public.farms 
      WHERE public.farms.id = public.crops.farm_id 
      AND public.farms.farmer_id = auth.uid()
    )
  );

-- INSERT policy
CREATE POLICY "Farmers can insert their own crops"
  ON public.crops
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = farmer_id 
    AND EXISTS (
      SELECT 1 FROM public.farms 
      WHERE public.farms.id = public.crops.farm_id 
      AND public.farms.farmer_id = auth.uid()
    )
  );

-- UPDATE policy
CREATE POLICY "Farmers can update their own crops"
  ON public.crops
  FOR UPDATE
  TO authenticated
  USING (
    auth.uid() = farmer_id 
    AND EXISTS (
      SELECT 1 FROM public.farms 
      WHERE public.farms.id = public.crops.farm_id 
      AND public.farms.farmer_id = auth.uid()
    )
  )
  WITH CHECK (
    auth.uid() = farmer_id 
    AND EXISTS (
      SELECT 1 FROM public.farms 
      WHERE public.farms.id = public.crops.farm_id 
      AND public.farms.farmer_id = auth.uid()
    )
  );

-- DELETE policy
CREATE POLICY "Farmers can delete their own crops"
  ON public.crops
  FOR DELETE
  TO authenticated
  USING (
    auth.uid() = farmer_id 
    AND EXISTS (
      SELECT 1 FROM public.farms 
      WHERE public.farms.id = public.crops.farm_id 
      AND public.farms.farmer_id = auth.uid()
    )
  );

-- Trigger to automatically update updated_at on crop edit
DROP TRIGGER IF EXISTS on_crops_updated ON public.crops;
CREATE TRIGGER on_crops_updated
  BEFORE UPDATE ON public.crops
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_crops_farmer_id ON public.crops(farmer_id);
CREATE INDEX IF NOT EXISTS idx_crops_farm_id ON public.crops(farm_id);
