-- 004_create_farm_activities.sql
-- KrishiRakshak AI: Farm Activities table with Row Level Security (RLS) and Role Grants

CREATE TABLE IF NOT EXISTS public.farm_activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  farmer_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  farm_id UUID NOT NULL REFERENCES public.farms(id) ON DELETE CASCADE,
  crop_id UUID REFERENCES public.crops(id) ON DELETE SET NULL,
  activity_type TEXT NOT NULL,
  activity_date DATE NOT NULL DEFAULT CURRENT_DATE,
  description TEXT NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Grant Table Permissions
GRANT ALL ON TABLE public.farm_activities TO authenticated;
GRANT SELECT ON TABLE public.farm_activities TO anon;

-- Enable Row Level Security (RLS)
ALTER TABLE public.farm_activities ENABLE ROW LEVEL SECURITY;

-- Clean up existing policies before recreation
DROP POLICY IF EXISTS "Farmers can view their own activities" ON public.farm_activities;
DROP POLICY IF EXISTS "Farmers can insert their own activities" ON public.farm_activities;
DROP POLICY IF EXISTS "Farmers can update their own activities" ON public.farm_activities;
DROP POLICY IF EXISTS "Farmers can delete their own activities" ON public.farm_activities;

-- SELECT policy
CREATE POLICY "Farmers can view their own activities"
  ON public.farm_activities
  FOR SELECT
  TO authenticated
  USING (
    auth.uid() = farmer_id 
    AND EXISTS (
      SELECT 1 FROM public.farms 
      WHERE public.farms.id = public.farm_activities.farm_id 
      AND public.farms.farmer_id = auth.uid()
    )
  );

-- INSERT policy
CREATE POLICY "Farmers can insert their own activities"
  ON public.farm_activities
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = farmer_id 
    AND EXISTS (
      SELECT 1 FROM public.farms 
      WHERE public.farms.id = public.farm_activities.farm_id 
      AND public.farms.farmer_id = auth.uid()
    )
  );

-- UPDATE policy
CREATE POLICY "Farmers can update their own activities"
  ON public.farm_activities
  FOR UPDATE
  TO authenticated
  USING (
    auth.uid() = farmer_id 
    AND EXISTS (
      SELECT 1 FROM public.farms 
      WHERE public.farms.id = public.farm_activities.farm_id 
      AND public.farms.farmer_id = auth.uid()
    )
  )
  WITH CHECK (
    auth.uid() = farmer_id 
    AND EXISTS (
      SELECT 1 FROM public.farms 
      WHERE public.farms.id = public.farm_activities.farm_id 
      AND public.farms.farmer_id = auth.uid()
    )
  );

-- DELETE policy
CREATE POLICY "Farmers can delete their own activities"
  ON public.farm_activities
  FOR DELETE
  TO authenticated
  USING (
    auth.uid() = farmer_id 
    AND EXISTS (
      SELECT 1 FROM public.farms 
      WHERE public.farms.id = public.farm_activities.farm_id 
      AND public.farms.farmer_id = auth.uid()
    )
  );

-- Trigger to automatically update updated_at on activity edit
DROP TRIGGER IF EXISTS on_farm_activities_updated ON public.farm_activities;
CREATE TRIGGER on_farm_activities_updated
  BEFORE UPDATE ON public.farm_activities
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_farm_activities_farmer_id ON public.farm_activities(farmer_id);
CREATE INDEX IF NOT EXISTS idx_farm_activities_farm_id ON public.farm_activities(farm_id);
CREATE INDEX IF NOT EXISTS idx_farm_activities_crop_id ON public.farm_activities(crop_id);
