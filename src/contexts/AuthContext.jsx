import { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../lib/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const PROFILE_CACHE_KEY = 'careerz_profile_cache';

const getCachedProfile = () => {
  try {
    const cached = localStorage.getItem(PROFILE_CACHE_KEY);
    return cached ? JSON.parse(cached) : null;
  } catch { return null; }
};

const setCachedProfile = (profile) => {
  try {
    if (profile) {
      localStorage.setItem(PROFILE_CACHE_KEY, JSON.stringify(profile));
    } else {
      localStorage.removeItem(PROFILE_CACHE_KEY);
    }
  } catch {}
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (uid) => {
    if (!db || !uid) return null;
    try {
      const snap = await getDoc(doc(db, 'profiles', uid));
      if (snap.exists()) {
        return { id: uid, ...snap.data() };
      }
      return null;
    } catch (err) {
      console.error('fetchProfile error:', err);
      return null;
    }
  };

  const createProfile = async (uid, data) => {
    if (!db) return;
    try {
      await setDoc(doc(db, 'profiles', uid), {
        ...data,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
    } catch (err) {
      console.error('createProfile error:', err);
    }
  };

  useEffect(() => {
    if (!auth) {
      // No Firebase — localStorage fallback
      const localUser = localStorage.getItem('demo_user');
      if (localUser) {
        const u = JSON.parse(localUser);
        setUser(u);
        setProfile({ role: u.user_metadata?.role || 'user', ...u.user_metadata });
      }
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const appUser = {
          id: firebaseUser.uid,
          email: firebaseUser.email,
          user_metadata: {
            full_name: firebaseUser.displayName || '',
          },
          created_at: firebaseUser.metadata?.creationTime || new Date().toISOString(),
        };
        setUser(appUser);

        // Use cached profile immediately so UI doesn't wait
        const cached = getCachedProfile();
        if (cached && cached.id === firebaseUser.uid) {
          setProfile(cached);
          setLoading(false);
          // Refresh in background — only update if Firestore has real data
          fetchProfile(firebaseUser.uid).then((fresh) => {
            if (fresh) {
              setProfile(fresh);
              setCachedProfile(fresh);
            }
          });
        } else {
          // No cache — fetch from Firestore
          const fresh = await fetchProfile(firebaseUser.uid);
          if (fresh) {
            setProfile(fresh);
            setCachedProfile(fresh);
          } else {
            // No Firestore doc yet (new user) — use basic fallback
            const fallback = { id: firebaseUser.uid, role: 'user' };
            setProfile(fallback);
          }
          setLoading(false);
        }
      } else {
        setUser(null);
        setProfile(null);
        setCachedProfile(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const signUp = async (email, password, metadata = {}) => {
    if (!auth) {
      const demoUser = {
        id: `demo-${Date.now()}`,
        email,
        user_metadata: metadata,
        created_at: new Date().toISOString(),
      };
      localStorage.setItem('demo_user', JSON.stringify(demoUser));
      setUser(demoUser);
      setProfile({ role: metadata.role || 'user', ...metadata });
      return { data: { user: demoUser }, error: null };
    }

    try {
      console.log('[SignUp] Creating user account...');
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      console.log('[SignUp] User created:', cred.user.uid);
      
      // Set display name
      if (metadata.full_name) {
        await updateProfile(cred.user, { displayName: metadata.full_name });
      }
      
      // Create Firestore profile
      const profileData = {
        role: metadata.role || 'user',
        full_name: metadata.full_name || '',
        company_name: metadata.company_name || '',
        industry: metadata.industry || '',
        company_size: metadata.company_size || '',
        website: metadata.website || '',
        description: '',
      };
      
      // Create Firestore profile in background (don't block UI)
      createProfile(cred.user.uid, profileData)
        .then(() => console.log('[SignUp] Profile saved to Firestore'))
        .catch((err) => console.warn('[SignUp] Firestore write failed, will retry:', err.message));
      
      // Set user and profile immediately so UI can proceed
      const appUser = {
        id: cred.user.uid,
        email: cred.user.email,
        user_metadata: { full_name: metadata.full_name || '' },
        created_at: cred.user.metadata?.creationTime || new Date().toISOString(),
      };
      setUser(appUser);
      const fullProfile = { id: cred.user.uid, ...profileData };
      setProfile(fullProfile);
      setCachedProfile(fullProfile);
      setLoading(false);
      
      console.log('[SignUp] Success, state updated');
      return { data: { user: cred.user }, error: null };
    } catch (err) {
      console.error('[SignUp] Error:', err);
      return { data: { user: null }, error: err };
    }
  };

  const signIn = async (email, password) => {
    if (!auth) {
      const demoUser = {
        id: `demo-${Date.now()}`,
        email,
        user_metadata: {},
        created_at: new Date().toISOString(),
      };
      localStorage.setItem('demo_user', JSON.stringify(demoUser));
      setUser(demoUser);
      setProfile({ role: 'user' });
      return { data: { user: demoUser }, error: null };
    }

    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);

      // Set user immediately
      const appUser = {
        id: cred.user.uid,
        email: cred.user.email,
        user_metadata: { full_name: cred.user.displayName || '' },
        created_at: cred.user.metadata?.creationTime || new Date().toISOString(),
      };
      setUser(appUser);

      // Use cached profile or fetch fresh
      const cached = getCachedProfile();
      if (cached && cached.id === cred.user.uid) {
        setProfile(cached);
        setLoading(false);
        // Refresh in background — only update if Firestore has real data
        fetchProfile(cred.user.uid).then((fresh) => {
          if (fresh) {
            setProfile(fresh);
            setCachedProfile(fresh);
          }
        });
      } else {
        const fresh = await fetchProfile(cred.user.uid);
        if (fresh) {
          setProfile(fresh);
          setCachedProfile(fresh);
        } else {
          setProfile({ id: cred.user.uid, role: 'user' });
        }
        setLoading(false);
      }

      return { data: { user: cred.user }, error: null };
    } catch (err) {
      return { data: { user: null }, error: err };
    }
  };

  const signInWithGoogle = async (role = 'user') => {
    if (!auth) return { data: null, error: new Error('Firebase not configured') };

    try {
      const provider = new GoogleAuthProvider();
      const cred = await signInWithPopup(auth, provider);

      // Build a fallback profile from Google account data
      const fallbackProfile = {
        id: cred.user.uid,
        role,
        full_name: cred.user.displayName || '',
      };

      // Try to create/fetch Firestore profile, but don't block login if offline
      try {
        if (db) {
          const existingProfile = await getDoc(doc(db, 'profiles', cred.user.uid));
          if (!existingProfile.exists()) {
            await createProfile(cred.user.uid, {
              role,
              full_name: cred.user.displayName || '',
              company_name: '',
              industry: '',
              company_size: '',
              website: '',
              description: '',
            });
            setProfile(fallbackProfile);
            setCachedProfile(fallbackProfile);
          } else {
            const p = { id: cred.user.uid, ...existingProfile.data() };
            setProfile(p);
            setCachedProfile(p);
          }
        }
      } catch (firestoreErr) {
        console.warn('Firestore unavailable, using fallback profile:', firestoreErr.message);
        setProfile(fallbackProfile);
        setCachedProfile(fallbackProfile);
      }

      // Set user immediately so redirect works
      const appUser = {
        id: cred.user.uid,
        email: cred.user.email,
        user_metadata: { full_name: cred.user.displayName || '' },
        created_at: cred.user.metadata?.creationTime || new Date().toISOString(),
      };
      setUser(appUser);
      setLoading(false);

      return { data: { user: cred.user }, error: null };
    } catch (err) {
      return { data: null, error: err };
    }
  };

  const signOut = async () => {
    if (!auth) {
      localStorage.removeItem('demo_user');
      setUser(null);
      setProfile(null);
      setLoading(false);
      return { error: null };
    }

    setUser(null);
    setProfile(null);
    setCachedProfile(null);
    setLoading(false);

    try {
      await firebaseSignOut(auth);
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
    signInWithGoogle,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
