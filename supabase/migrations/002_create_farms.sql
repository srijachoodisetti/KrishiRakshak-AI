-- 002_create_farms.sql
-- KrishiRakshak AI: Farms table with Row Level Security (RLS) and Role Grants

-- 1. Create farms table
CREATE TABLE IF NOT EXISTS public.farms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  farmer_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  farm_name TEXT NOT NULL,
  village TEXT,
  district TEXT,
  state TEXT,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  land_area NUMERIC NOT NULL,
  land_area_unit TEXT NOT NULL DEFAULT 'Acres',
  soil_type TEXT,
  irrigation_type TEXT,
  water_source TEXT,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 2. Explicitly Grant Table Permissions to authenticated and anon Supabase roles
GRANT ALL ON TABLE public.farms TO authenticated;
GRANT SELECT ON TABLE public.farms TO anon;

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.farms ENABLE ROW LEVEL SECURITY;

-- 4. Clean up any existing policies before recreation
DROP POLICY IF EXISTS "Farmers can view their own farms" ON public.farms;
DROP POLICY IF EXISTS "Farmers can insert their own farms" ON public.farms;
DROP POLICY IF EXISTS "Farmers can update their own farms" ON public.farms;
DROP POLICY IF EXISTS "Farmers can delete their own farms" ON public.farms;

-- 5. Row Level Security Policies
-- SELECT policy: Farmers can only view their own farms
CREATE POLICY "Farmers can view their own farms"
  ON public.farms
  FOR SELECT
  TO authenticated
  USING (auth.uid() = farmer_id);

-- INSERT policy: Farmers can only insert their own farms
CREATE POLICY "Farmers can insert their own farms"
  ON public.farms
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = farmer_id);

-- UPDATE policy: Farmers can only update their own farms
CREATE POLICY "Farmers can update their own farms"
  ON public.farms
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = farmer_id)
  WITH CHECK (auth.uid() = farmer_id);

-- DELETE policy: Farmers can only delete their own farms
CREATE POLICY "Farmers can delete their own farms"
  ON public.farms
  FOR DELETE
  TO authenticated
  USING (auth.uid() = farmer_id);

-- 6. Trigger to automatically update updated_at on farm edit
DROP TRIGGER IF EXISTS on_farms_updated ON public.farms;
CREATE TRIGGER on_farms_updated
  BEFORE UPDATE ON public.farms
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- 7. Indexes for performance
CREATE INDEX IF NOT EXISTS idx_farms_farmer_id ON public.farms(farmer_id);
