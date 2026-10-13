import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface AuthContextValue {
  session: Session | null;
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  authError: string | null;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  const checkAdmin = useCallback(async (userId: string | undefined) => {
    if (!userId) {
      setIsAdmin(false);
      return;
    }
    try {
      const { data, error } = await supabase
        .from('blog_admins')
        .select('user_id')
        .eq('user_id', userId)
        .maybeSingle();
      if (error) {
        setIsAdmin(false);
        return;
      }
      setIsAdmin(Boolean(data));
    } catch {
      setIsAdmin(false);
    }
  }, []);

  useEffect(() => {
    let mounted = true;
    supabase.auth
      .getSession()
      .then(async ({ data }) => {
        if (!mounted) return;
        setSession(data.session);
        await checkAdmin(data.session?.user?.id);
        setLoading(false);
      })
      .catch(() => {
        if (mounted) setLoading(false);
      });

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, nextSession) => {
        setSession(nextSession);
        await checkAdmin(nextSession?.user?.id);
      },
    );
    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, [checkAdmin]);

  const signIn = useCallback(async (email: string, password: string) => {
    setAuthError(null);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    if (error) {
      const msg =
        error.message.toLowerCase().includes('invalid') ||
        error.message.toLowerCase().includes('credentials')
          ? 'Invalid email or password. Please try again.'
          : error.message;
      setAuthError(msg);
      return { error: msg };
    }
    setSession(data.session);
    await checkAdmin(data.session?.user?.id);
    // Verify allowlist — do not treat every authenticated user as admin.
    const { data: adminRow } = await supabase
      .from('blog_admins')
      .select('user_id')
      .eq('user_id', data.session?.user?.id ?? '')
      .maybeSingle();
    if (!adminRow) {
      await supabase.auth.signOut();
      setSession(null);
      setIsAdmin(false);
      const msg = 'This account is not authorized for admin access.';
      setAuthError(msg);
      return { error: msg };
    }
    setIsAdmin(true);
    return { error: null };
  }, [checkAdmin]);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setSession(null);
    setIsAdmin(false);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      user: session?.user ?? null,
      isAdmin,
      loading,
      authError,
      signIn,
      signOut,
    }),
    [session, isAdmin, loading, authError, signIn, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
