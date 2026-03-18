-- Run this in Supabase SQL Editor to diagnose the role assignment issue

-- 1) Check the profiles table schema - look for DEFAULT constraint on role column
SELECT 
    column_name,
    data_type,
    column_default,
    is_nullable
FROM information_schema.columns
WHERE table_schema = 'public' 
  AND table_name = 'profiles'
  AND column_name = 'role';

-- 2) Check if the trigger exists and is enabled
SELECT 
    trigger_name,
    event_manipulation,
    event_object_table,
    action_statement,
    action_timing
FROM information_schema.triggers
WHERE trigger_name = 'on_auth_user_created';

-- 3) Check the trigger function definition
SELECT pg_get_functiondef('public.handle_new_user()'::regprocedure);

-- 4) Check recent users and their roles
SELECT 
    u.id,
    u.email,
    u.created_at,
    u.raw_user_meta_data->>'role' as metadata_role,
    p.role as profile_role,
    p.company_name,
    CASE 
        WHEN u.raw_user_meta_data->>'role' != p.role THEN '❌ MISMATCH'
        ELSE '✓ OK'
    END as status
FROM auth.users u
LEFT JOIN public.profiles p ON p.id = u.id
ORDER BY u.created_at DESC
LIMIT 20;

-- 5) Count users by role
SELECT 
    p.role,
    COUNT(*) as count
FROM public.profiles p
GROUP BY p.role;
