
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase, isSupabaseInitialized } from "@/lib/supabase";
import { toast } from "@/components/ui/sonner";

interface User {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  avatar_url?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any | null }>;
  signUp: (email: string, password: string) => Promise<{ error: any | null, user: any | null }>;
  signOut: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<{ error: any | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar si Supabase está inicializado
    if (!isSupabaseInitialized()) {
      setLoading(false);
      toast.error("Error de configuración", { 
        description: "No se pudo conectar con Supabase. Compruebe la conexión." 
      });
      return;
    }

    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state changed:", event, session?.user?.id);
        
        if (session) {
          try {
            const { data: userData, error } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();

            if (error) {
              console.error("Error fetching user profile:", error);
            }

            setUser({
              id: session.user.id,
              email: session.user.email!,
              ...(userData || {})
            });
          } catch (error) {
            console.error("Error in auth state change handler:", error);
          }
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    // THEN check for existing session
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          const { data: userData, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          if (error) {
            console.error("Error fetching profile:", error);
          }

          setUser({
            id: session.user.id,
            email: session.user.email!,
            ...(userData || {})
          });
        }
      } catch (error) {
        console.error("Error checking session:", error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    if (!isSupabaseInitialized()) {
      return { error: new Error("Supabase not initialized") };
    }
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Error signing in:", error.message);
        toast.error("Error al iniciar sesión", { description: error.message });
      }

      return { error };
    } catch (error: any) {
      console.error("Exception during sign in:", error);
      toast.error("Error inesperado", { description: error.message || "Ha ocurrido un error al iniciar sesión" });
      return { error };
    }
  };

  const signUp = async (email: string, password: string) => {
    if (!isSupabaseInitialized()) {
      return { error: new Error("Supabase not initialized"), user: null };
    }
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        console.error("Error signing up:", error.message);
        toast.error("Error al registrarse", { description: error.message });
        return { error, user: null };
      }

      toast.success("Registro exitoso", { 
        description: "Hemos enviado un correo de verificación. Por favor verifica tu correo electrónico." 
      });

      return { error, user: data.user };
    } catch (error: any) {
      console.error("Exception during sign up:", error);
      toast.error("Error inesperado", { description: error.message || "Ha ocurrido un error al registrarse" });
      return { error, user: null };
    }
  };

  const signOut = async () => {
    if (!isSupabaseInitialized()) {
      return;
    }
    
    try {
      await supabase.auth.signOut();
      setUser(null);
    } catch (error: any) {
      console.error("Error signing out:", error);
      toast.error("Error al cerrar sesión", { description: error.message || "Ha ocurrido un error al cerrar sesión" });
    }
  };

  const updateProfile = async (data: Partial<User>) => {
    if (!isSupabaseInitialized()) {
      return { error: new Error("Supabase not initialized") };
    }
    
    if (!user) {
      return { error: new Error("No authenticated user") };
    }

    try {
      const { error } = await supabase
        .from('profiles')
        .update(data)
        .eq('id', user.id);

      if (!error) {
        setUser({ ...user, ...data });
        toast.success("Perfil actualizado", { description: "Tus datos se han actualizado correctamente." });
      } else {
        console.error("Error updating profile:", error.message);
        toast.error("Error al actualizar perfil", { description: error.message });
      }

      return { error };
    } catch (error: any) {
      console.error("Exception during profile update:", error);
      toast.error("Error inesperado", { description: error.message || "Ha ocurrido un error al actualizar el perfil" });
      return { error };
    }
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
