-- Run in Supabase SQL Editor

-- 1) Add missing columns to profiles table
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS company_name text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS full_name text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS website text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS industry text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS company_size text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS description text;

-- 2) Ensure RLS is enabled
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 3) Allow users to read their own profile
DROP POLICY IF EXISTS "Users can read own profile" ON public.profiles;
CREATE POLICY "Users can read own profile"
ON public.profiles
FOR SELECT
USING (auth.uid() = id);

-- 4) Allow users to update their own profile
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile"
ON public.profiles
FOR UPDATE
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- 5) Allow users to insert their own profile (for auto-creation on first login)
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
CREATE POLICY "Users can insert own profile"
ON public.profiles
FOR INSERT
WITH CHECK (auth.uid() = id);

-- 6) Fix any existing company users whose profile has wrong role
UPDATE public.profiles p
SET role = u.raw_user_meta_data->>'role',
    company_name = u.raw_user_meta_data->>'company_name',
    full_name = u.raw_user_meta_data->>'full_name'
FROM auth.users u
WHERE p.id = u.id
  AND u.raw_user_meta_data->>'role' = 'company'
  AND p.role != 'company';
