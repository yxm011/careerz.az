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

  const fetchProfile = async (userId) => {
    if (!supabase || !userId) return null;
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    if (data) return data;

    // No profile yet (existing user before role system) — create a default student profile
    const { data: created } = await supabase
      .from('profiles')
      .upsert({ id: userId, role: 'student' }, { onConflict: 'id' })
      .select()
      .single();
    return created || null;
  };

  useEffect(() => {
    if (!supabase) {
      const localUser = localStorage.getItem('demo_user');
      if (localUser) {
        const u = JSON.parse(localUser);
        setUser(u);
        setProfile({ role: u.user_metadata?.role || 'student', ...u.user_metadata });
      }
      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        const p = await fetchProfile(session.user.id);
        setProfile(p);
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        const p = await fetchProfile(session.user.id);
        setProfile(p);
      } else {
        setProfile(null);
      }
    });

    return () => subscription.unsubscribe();
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
      options: { data: metadata }
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
    return { data, error };
  };

  const signOut = async () => {
    if (!supabase) {
      localStorage.removeItem('demo_user');
      setUser(null);
      setProfile(null);
      return { error: null };
    }

    const { error } = await supabase.auth.signOut();
    return { error };
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
