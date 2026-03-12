# Supabase Setup Guide

This application uses Supabase for authentication and user data persistence. Follow these steps to set up Supabase for your project.

## 1. Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com) and sign up/sign in
2. Click "New Project"
3. Fill in your project details:
   - Project name: `careerz-az` (or your preferred name)
   - Database password: Choose a strong password
   - Region: Select the closest region to your users
4. Click "Create new project"

## 2. Get Your API Credentials

Once your project is created:

1. Go to Project Settings (gear icon in the sidebar)
2. Click on "API" in the settings menu
3. Copy the following values:
   - **Project URL** (under "Project URL")
   - **anon/public key** (under "Project API keys")

## 3. Configure Environment Variables

1. Create a `.env` file in the root of your project:
   ```bash
   cp .env.example .env
   ```

2. Add your Supabase credentials to `.env`:
   ```
   VITE_SUPABASE_URL=your_project_url_here
   VITE_SUPABASE_ANON_KEY=your_anon_key_here
   ```

3. **Important**: Make sure `.env` is in your `.gitignore` file (it should be by default)

## 4. Database Schema (Optional - for future use)

Currently, the app uses localStorage for data persistence. When you're ready to migrate to Supabase database:

### Users Table
The authentication is handled automatically by Supabase Auth. User metadata (like full_name) is stored in the auth.users table.

### Simulations Progress Table
```sql
create table user_progress (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  simulation_id text not null,
  current_stage_index integer default 0,
  total_stages integer,
  responses jsonb default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table user_progress enable row level security;

-- Create policies
create policy "Users can view their own progress"
  on user_progress for select
  using (auth.uid() = user_id);

create policy "Users can insert their own progress"
  on user_progress for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own progress"
  on user_progress for update
  using (auth.uid() = user_id);
```

### Submissions Table
```sql
create table submissions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  simulation_id text not null,
  responses jsonb not null,
  status text default 'submitted',
  submitted_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table submissions enable row level security;

-- Create policies
create policy "Users can view their own submissions"
  on submissions for select
  using (auth.uid() = user_id);

create policy "Users can insert their own submissions"
  on submissions for insert
  with check (auth.uid() = user_id);
```

## 5. Testing Authentication

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `/signup` and create a test account
3. Check your Supabase dashboard under Authentication > Users to see the new user

## 6. Demo Mode (Without Supabase)

The app includes a demo mode that works without Supabase configuration. If you don't set up the environment variables, the app will:
- Use localStorage for authentication
- Create demo user accounts
- Still track progress locally

This is useful for development and testing without setting up Supabase.

## Troubleshooting

### "Invalid API key" error
- Double-check that you copied the correct anon/public key (not the service_role key)
- Make sure there are no extra spaces in your `.env` file

### Authentication not working
- Clear your browser's localStorage and cookies
- Check the browser console for error messages
- Verify your Supabase project is active and not paused

### Email confirmation required
- By default, Supabase requires email confirmation
- To disable for development: Go to Authentication > Settings > Email Auth and toggle off "Enable email confirmations"

## Next Steps

Once Supabase is set up, you can:
- Migrate data from localStorage to Supabase tables
- Add social authentication (Google, GitHub, etc.)
- Implement password reset functionality
- Add user profile management
- Set up real-time subscriptions for live updates
