import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export interface OrganizerUser {
  id: string;
  email: string;
  name: string;
  role: 'lead_organizer' | 'growth_manager';
  isDemoUser: boolean;
}

interface AuthContextType {
  user: OrganizerUser | null;
  loading: boolean;
  loginWithPassword: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  loginAsDemoOrganizer: () => Promise<void>;
  logout: () => Promise<void>;
  isDemoMode: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_ORGANIZER: OrganizerUser = {
  id: 'org-demo-1',
  email: 'organizer@nxtwave.tech',
  name: 'Ananya Growth Lead (Demo)',
  role: 'lead_organizer',
  isDemoUser: true
};

const DEMO_SESSION_KEY = 'growthloop_demo_auth_session';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<OrganizerUser | null>(null);
  const [loading, setLoading] = useState(true);
  const isDemoMode = !isSupabaseConfigured();

  useEffect(() => {
    const initializeAuth = async () => {
      if (isSupabaseConfigured() && supabase) {
        try {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user) {
            setUser({
              id: session.user.id,
              email: session.user.email || '',
              name: session.user.user_metadata?.full_name || 'Campaign Organizer',
              role: 'lead_organizer',
              isDemoUser: false
            });
          }
          const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session?.user) {
              setUser({
                id: session.user.id,
                email: session.user.email || '',
                name: session.user.user_metadata?.full_name || 'Campaign Organizer',
                role: 'lead_organizer',
                isDemoUser: false
              });
            } else {
              setUser(null);
            }
          });
          return () => {
            authListener.subscription.unsubscribe();
          };
        } catch (e) {
          console.warn('Supabase auth initialization error:', e);
        }
      } else {
        // Check demo session
        const stored = sessionStorage.getItem(DEMO_SESSION_KEY);
        if (stored) {
          try {
            setUser(JSON.parse(stored));
          } catch {
            sessionStorage.removeItem(DEMO_SESSION_KEY);
          }
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, [isDemoMode]);

  const loginWithPassword = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setLoading(true);
    const normalizedEmail = email.trim().toLowerCase();

    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: normalizedEmail,
          password
        });
        if (error) {
          setLoading(false);
          return { success: false, error: error.message };
        }
        if (data.user) {
          setUser({
            id: data.user.id,
            email: data.user.email || normalizedEmail,
            name: data.user.user_metadata?.full_name || 'Campaign Organizer',
            role: 'lead_organizer',
            isDemoUser: false
          });
        }
        setLoading(false);
        return { success: true };
      } catch (err: unknown) {
        setLoading(false);
        return { success: false, error: (err as Error).message || 'Authentication error.' };
      }
    }

    // Demo Mode Authentication
    // Provides realistic authentication verification
    if (normalizedEmail === 'organizer@nxtwave.tech' && password === 'nxtwave2026') {
      setUser(DEMO_ORGANIZER);
      sessionStorage.setItem(DEMO_SESSION_KEY, JSON.stringify(DEMO_ORGANIZER));
      setLoading(false);
      return { success: true };
    }

    setLoading(false);
    return {
      success: false,
      error: 'Invalid credentials. In Demo Mode, use organizer@nxtwave.tech / nxtwave2026 or click "Instant Demo Login".'
    };
  };

  const loginAsDemoOrganizer = async (): Promise<void> => {
    setLoading(true);
    await new Promise((res) => setTimeout(res, 200));
    setUser(DEMO_ORGANIZER);
    sessionStorage.setItem(DEMO_SESSION_KEY, JSON.stringify(DEMO_ORGANIZER));
    setLoading(false);
  };

  const logout = async (): Promise<void> => {
    setLoading(true);
    if (isSupabaseConfigured() && supabase) {
      await supabase.auth.signOut();
    }
    sessionStorage.removeItem(DEMO_SESSION_KEY);
    setUser(null);
    setLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        loginWithPassword,
        loginAsDemoOrganizer,
        logout,
        isDemoMode
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
