-- Run this ONLY if the diagnosis shows that profiles.role has DEFAULT 'student'
-- This removes the dangerous default and ensures the trigger controls role assignment

-- 1) Remove the DEFAULT constraint from the role column
ALTER TABLE public.profiles 
ALTER COLUMN role DROP DEFAULT;

-- 2) Verify the trigger function exists and is correct
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

-- 3) Ensure the trigger is attached
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 4) Fix ALL existing users whose role doesn't match their metadata
UPDATE public.profiles p
SET
  role = COALESCE(u.raw_user_meta_data->>'role', 'student'),
  full_name = COALESCE(u.raw_user_meta_data->>'full_name', p.full_name),
  company_name = COALESCE(u.raw_user_meta_data->>'company_name', p.company_name),
  website = COALESCE(u.raw_user_meta_data->>'website', p.website),
  industry = COALESCE(u.raw_user_meta_data->>'industry', p.industry),
  company_size = COALESCE(u.raw_user_meta_data->>'company_size', p.company_size)
FROM auth.users u
WHERE p.id = u.id
  AND (
    p.role != COALESCE(u.raw_user_meta_data->>'role', 'student')
    OR p.role IS NULL
  );

-- 5) Verify the fix
SELECT 
    u.email,
    u.raw_user_meta_data->>'role' as metadata_role,
    p.role as profile_role,
    p.company_name,
    CASE 
        WHEN u.raw_user_meta_data->>'role' = p.role THEN '✓ FIXED'
        WHEN u.raw_user_meta_data->>'role' IS NULL AND p.role = 'student' THEN '✓ OK (default)'
        ELSE '❌ STILL BROKEN'
    END as status
FROM auth.users u
JOIN public.profiles p ON p.id = u.id
ORDER BY u.created_at DESC;
