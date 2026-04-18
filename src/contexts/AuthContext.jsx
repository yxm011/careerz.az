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

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (uid) => {
    if (!db || !uid) return { id: uid, role: 'user' };
    try {
      const snap = await getDoc(doc(db, 'profiles', uid));
      if (snap.exists()) {
        return { id: uid, ...snap.data() };
      }
      return { id: uid, role: 'user' };
    } catch (err) {
      console.error('fetchProfile error:', err);
      return { id: uid, role: 'user' };
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
        // Only fetch profile if not already set (avoids double fetch after Google sign-in)
        setProfile((currentProfile) => {
          if (currentProfile?.id === firebaseUser.uid) return currentProfile;
          // Fetch async but don't block
          fetchProfile(firebaseUser.uid).then(setProfile);
          return currentProfile;
        });
      } else {
        setUser(null);
        setProfile(null);
      }
      setLoading(false);
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
      const cred = await createUserWithEmailAndPassword(auth, email, password);
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
      await createProfile(cred.user.uid, profileData);
      
      // Set user and profile immediately so UI can proceed
      const appUser = {
        id: cred.user.uid,
        email: cred.user.email,
        user_metadata: { full_name: metadata.full_name || '' },
        created_at: cred.user.metadata?.creationTime || new Date().toISOString(),
      };
      setUser(appUser);
      setProfile({ id: cred.user.uid, ...profileData });
      setLoading(false);
      
      return { data: { user: cred.user }, error: null };
    } catch (err) {
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
          } else {
            setProfile({ id: cred.user.uid, ...existingProfile.data() });
          }
        }
      } catch (firestoreErr) {
        console.warn('Firestore unavailable, using fallback profile:', firestoreErr.message);
        setProfile(fallbackProfile);
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
