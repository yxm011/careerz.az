import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const emailRedirectTo = import.meta.env.VITE_PUBLIC_SITE_URL || 'https://careerz.az';

  const fetchProfile = async (userId) => {
    if (!supabase || !userId) return null;
    try {
      // Just fetch the profile — DB trigger guarantees it exists with correct role
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (data) {
        return data;
      }

      // Profile missing (shouldn't happen with trigger, but handle gracefully)
      console.warn('Profile not found for user:', userId);
      return { id: userId, role: 'student' };
    } catch (err) {
      console.error('fetchProfile error:', err);
      return { id: userId, role: 'student' };
    }
  };

  useEffect(() => {
    let isMounted = true;
    const loadingSafetyTimer = setTimeout(() => {
      if (isMounted) {
        setLoading(false);
      }
    }, 4000);

    if (!supabase) {
      const localUser = localStorage.getItem('demo_user');
      if (localUser) {
        const u = JSON.parse(localUser);
        setUser(u);
        setProfile({ role: u.user_metadata?.role || 'student', ...u.user_metadata });
      }
      setLoading(false);
      clearTimeout(loadingSafetyTimer);
      return () => {
        isMounted = false;
        clearTimeout(loadingSafetyTimer);
      };
    }

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      try {
        if (!isMounted) return;
        setUser(session?.user ?? null);
        if (session?.user) {
          const p = await fetchProfile(session.user.id);
          if (isMounted) setProfile(p);
        }
      } catch (err) {
        console.error('getSession profile error:', err);
      } finally {
        if (isMounted) setLoading(false);
        clearTimeout(loadingSafetyTimer);
      }
    }).catch((err) => {
      console.error('getSession error:', err);
      if (isMounted) setLoading(false);
      clearTimeout(loadingSafetyTimer);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      try {
        if (!isMounted) return;
        setUser(session?.user ?? null);
        if (session?.user) {
          const p = await fetchProfile(session.user.id);
          if (isMounted) setProfile(p);
        } else {
          if (isMounted) setProfile(null);
        }
        if (isMounted) setLoading(false);
      } catch (err) {
        console.error('onAuthStateChange error:', err);
        if (isMounted) setLoading(false);
      }
    });

    return () => {
      isMounted = false;
      clearTimeout(loadingSafetyTimer);
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email, password, metadata = {}) => {
    if (!supabase) {
      const demoUser = {
        id: `demo-${Date.now()}`,
        email,
        user_metadata: metadata,
        created_at: new Date().toISOString()
      };
      localStorage.setItem('demo_user', JSON.stringify(demoUser));
      setUser(demoUser);
      setProfile({ role: metadata.role || 'student', ...metadata });
      return { data: { user: demoUser }, error: null };
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
        emailRedirectTo
      }
    });
    return { data, error };
  };

  const signIn = async (email, password) => {
    if (!supabase) {
      const demoUser = {
        id: `demo-${Date.now()}`,
        email,
        user_metadata: {},
        created_at: new Date().toISOString()
      };
      localStorage.setItem('demo_user', JSON.stringify(demoUser));
      setUser(demoUser);
      setProfile({ role: 'student' });
      return { data: { user: demoUser }, error: null };
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (!error && data?.user) {
      setUser(data.user);
      const p = await fetchProfile(data.user.id);
      setProfile(p);
      setLoading(false);
    }
    return { data, error };
  };

  const signOut = async () => {
    if (!supabase) {
      localStorage.removeItem('demo_user');
      setUser(null);
      setProfile(null);
      setLoading(false);
      return { error: null };
    }

    // Clear local auth state immediately so UI can react without waiting on network
    setUser(null);
    setProfile(null);
    setLoading(false);

    try {
      await Promise.race([
        supabase.auth.signOut(),
        new Promise((resolve) => setTimeout(resolve, 1500))
      ]);
    } catch (err) {
      console.error('signOut error:', err);
    }

    return { error: null };
  };

  const value = {
    user,
    profile,
    loading,
    signUp,
    signIn,
    signOut
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
