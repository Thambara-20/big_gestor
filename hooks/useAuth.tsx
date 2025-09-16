import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { User } from '../types';
import { useNavigate } from 'react-router-dom';
import * as blobService from '../services/blobStorageService';
import { supabase, isPersistenceEnabled } from '../services/blobStorageService';
// Fix: Use `import type` for importing types to resolve module resolution issues with Supabase.
// import type { User as SupabaseUser, AuthChangeEvent, Session } from '@supabase/supabase-js';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  login: (username: string, pass: string) => Promise<string | null>;
  register: (username: string, email: string, pass: string) => Promise<string | null>;
  logout: () => void;
  changePassword: (oldPass: string, newPass: string) => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const SYSTEM_USER_ID = 'system_data';

// Maps a Supabase user to our application's User type
// FIX: Using `any` for supabaseUser as type is not available for import in Supabase v1 style.
const mapSupabaseUserToAppUser = (supabaseUser: any): User => {
    return {
        id: supabaseUser.id,
        email: supabaseUser.email || '',
        username: supabaseUser.user_metadata.username || supabaseUser.email || '',
    };
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // If Supabase is configured, use the real authentication flow.
    if (supabase && isPersistenceEnabled) {
        const { data: authStateListener } = supabase.auth.onAuthStateChange((_event, session) => {
          const supabaseUser = session?.user;
          if (supabaseUser) {
            setCurrentUser(mapSupabaseUserToAppUser(supabaseUser));
          } else {
            setCurrentUser(null);
          }
          setLoading(false);
        });

        return () => {
          authStateListener?.subscription.unsubscribe();
        };
    } else {
        // If Supabase is NOT configured, block access by default.
        console.warn("Auth service not configured. App will require login, but it will fail.");
        setCurrentUser(null);
        setLoading(false);
    }
  }, []);

  const login = useCallback(async (emailOrUsername: string, pass: string): Promise<string | null> => {
    if (!supabase) return "Serviço de autenticação indisponível.";
    
    let email = emailOrUsername;
    // Check if user provided a username instead of an email
    if (!emailOrUsername.includes('@')) {
        const storedUsers = await blobService.get<User[]>(SYSTEM_USER_ID, 'users') || [];
        const foundUser = storedUsers.find(u => u.username.toLowerCase() === emailOrUsername.toLowerCase());
        if (foundUser) {
            email = foundUser.email;
        } else {
            return "Usuário não encontrado.";
        }
    }

    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: pass,
    });
    
    return error ? "Email ou senha inválidos." : null;
  }, []);

  const register = useCallback(async (username: string, email: string, pass:string): Promise<string | null> => {
    if (!supabase) return "Serviço de autenticação indisponível.";

    // 1. Check if username is already taken from our public list
    const storedUsers = await blobService.get<User[]>(SYSTEM_USER_ID, 'users') || [];
    if (storedUsers.some(u => u.username.toLowerCase() === username.toLowerCase())) {
        return "Este nome de usuário já está em uso.";
    }

    // 2. Sign up the user with Supabase Auth
    const { data: { user } , error: signUpError } = await supabase.auth.signUp({
      email: email, 
      password: pass,
      options: {
        data: { username: username }
      }
    });

    if (signUpError) {
        if (signUpError.message.includes("User already registered")) {
            return "Este email já está cadastrado.";
        }
        return "Erro ao registrar. Tente novamente.";
    }

    if (!user) {
        return "Não foi possível criar o usuário. Tente novamente.";
    }
    
    // 3. Add the new user to the public 'users.json' list for the team feature
    const newUserForPublicList: User = { id: user.id, username, email };
    const updatedUsers = [...storedUsers, newUserForPublicList];
    await blobService.set(SYSTEM_USER_ID, 'users', updatedUsers);

    // onAuthStateChange will handle setting the currentUser state
    return null; // Success
  }, []);

  const logout = useCallback(async () => {
    if (!supabase || !isPersistenceEnabled) {
        // In no-auth mode, logout is not meaningful. Reloading can serve as a "reset".
        window.location.reload();
        return;
    }
    await supabase.auth.signOut();
    setCurrentUser(null);
    sessionStorage.removeItem('brandingSplashShown');
    navigate('/login', { replace: true });
  }, [navigate]);

  const changePassword = useCallback(async (oldPass: string, newPass: string): Promise<string | null> => {
    if (!supabase || !currentUser) return "Usuário não autenticado.";

    // 1. Verify the old password by attempting to sign in.
    // This is a client-side pattern to re-authenticate for sensitive actions.
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: currentUser.email,
      password: oldPass,
    });

    if (signInError) {
      return "A senha antiga está incorreta.";
    }

    // 2. If the old password is correct, update to the new password.
    const { error: updateError } = await supabase.auth.updateUser({
      password: newPass,
    });
    
    if (updateError) {
        return `Erro ao atualizar a senha. Tente novamente.`;
    }

    return null; // Success
  }, [currentUser]);


  const value = {
    currentUser,
    loading,
    login,
    register,
    logout,
    changePassword,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
