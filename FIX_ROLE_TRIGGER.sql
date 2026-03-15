-- Run this ENTIRE script in Supabase SQL Editor
-- This creates a DB trigger that correctly labels every new user as 'student', 'company', or 'admin'
-- based on the metadata passed during signup.

-- 1) Drop old trigger if it exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- 2) Create or replace the trigger function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, role, full_name, company_name, website, industry, company_size)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'role', 'student'),
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'company_name',
    NEW.raw_user_meta_data->>'website',
    NEW.raw_user_meta_data->>'industry',
    NEW.raw_user_meta_data->>'company_size'
  )
  ON CONFLICT (id) DO UPDATE SET
    role = COALESCE(NEW.raw_user_meta_data->>'role', 'student'),
    full_name = COALESCE(NEW.raw_user_meta_data->>'full_name', profiles.full_name),
    company_name = COALESCE(NEW.raw_user_meta_data->>'company_name', profiles.company_name),
    website = COALESCE(NEW.raw_user_meta_data->>'website', profiles.website),
    industry = COALESCE(NEW.raw_user_meta_data->>'industry', profiles.industry),
    company_size = COALESCE(NEW.raw_user_meta_data->>'company_size', profiles.company_size);
  RETURN NEW;
END;
$$;

-- 3) Attach the trigger to fire on every new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 4) Fix ALL existing users — sync profiles.role from auth metadata
UPDATE public.profiles p
SET
  role      = COALESCE(u.raw_user_meta_data->>'role', 'student'),
  full_name = COALESCE(u.raw_user_meta_data->>'full_name', p.full_name),
  company_name = COALESCE(u.raw_user_meta_data->>'company_name', p.company_name),
  website   = COALESCE(u.raw_user_meta_data->>'website', p.website),
  industry  = COALESCE(u.raw_user_meta_data->>'industry', p.industry),
  company_size = COALESCE(u.raw_user_meta_data->>'company_size', p.company_size)
FROM auth.users u
WHERE p.id = u.id;

-- 5) Verify: check what roles exist now
SELECT p.id, u.email, p.role, p.company_name
FROM public.profiles p
JOIN auth.users u ON u.id = p.id
ORDER BY u.created_at DESC;
