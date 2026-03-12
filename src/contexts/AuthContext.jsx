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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if Supabase is configured
    if (!supabase) {
      // Fallback to localStorage for demo mode
      const localUser = localStorage.getItem('demo_user');
      if (localUser) {
        setUser(JSON.parse(localUser));
      }
      setLoading(false);
      return;
    }

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email, password, metadata = {}) => {
    if (!supabase) {
      // Demo mode fallback
      const demoUser = {
        id: `demo-${Date.now()}`,
        email,
        user_metadata: metadata,
        created_at: new Date().toISOString()
      };
      localStorage.setItem('demo_user', JSON.stringify(demoUser));
      setUser(demoUser);
      return { data: { user: demoUser }, error: null };
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata
      }
    });
    return { data, error };
  };

  const signIn = async (email, password) => {
    if (!supabase) {
      // Demo mode fallback
      const demoUser = {
        id: `demo-${Date.now()}`,
        email,
        user_metadata: {},
        created_at: new Date().toISOString()
      };
      localStorage.setItem('demo_user', JSON.stringify(demoUser));
      setUser(demoUser);
      return { data: { user: demoUser }, error: null };
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    return { data, error };
  };

  const signOut = async () => {
    if (!supabase) {
      // Demo mode fallback
      localStorage.removeItem('demo_user');
      setUser(null);
      return { error: null };
    }

    const { error } = await supabase.auth.signOut();
    return { error };
  };

  const value = {
    user,
    loading,
    signUp,
    signIn,
    signOut
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
