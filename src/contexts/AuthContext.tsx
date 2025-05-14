
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { createClient } from "@supabase/supabase-js";
import { toast } from "@/components/ui/sonner";

// Inicializar el cliente de Supabase con comprobación de variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Verificar si las variables de entorno están definidas
let supabase: any;
try {
  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase environment variables are missing");
  }
  supabase = createClient(supabaseUrl, supabaseKey);
} catch (error) {
  console.error("Failed to initialize Supabase client:", error);
  // El cliente de Supabase se inicializará como null si hay un error
}

interface User {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
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
    if (!supabase) {
      setLoading(false);
      toast.error("Error de configuración", { 
        description: "No se pudo conectar con Supabase. Compruebe las variables de entorno." 
      });
      return;
    }

    // Verificar si hay una sesión activa
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        const { data: userData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        setUser({
          id: session.user.id,
          email: session.user.email!,
          ...(userData || {})
        });
      }
      
      setLoading(false);
    };

    // Configurar listener para cambios en la autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session) {
          const { data: userData } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          setUser({
            id: session.user.id,
            email: session.user.email!,
            ...(userData || {})
          });
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    checkSession();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    if (!supabase) {
      return { error: new Error("Supabase not initialized") };
    }
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error("Error al iniciar sesión", { description: error.message });
    }

    return { error };
  };

  const signUp = async (email: string, password: string) => {
    if (!supabase) {
      return { error: new Error("Supabase not initialized"), user: null };
    }
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      toast.error("Error al registrarse", { description: error.message });
      return { error, user: null };
    }

    if (data.user && !error) {
      // Crear perfil para el nuevo usuario
      await supabase.from('profiles').insert({
        id: data.user.id,
        email: data.user.email,
        created_at: new Date().toISOString(),
      });
      toast.success("Registro exitoso", { description: "Por favor verifica tu correo electrónico." });
    }

    return { error, user: data.user };
  };

  const signOut = async () => {
    if (!supabase) {
      return;
    }
    await supabase.auth.signOut();
    setUser(null);
  };

  const updateProfile = async (data: Partial<User>) => {
    if (!supabase) {
      return { error: new Error("Supabase not initialized") };
    }
    if (!user) {
      return { error: new Error("No authenticated user") };
    }

    const { error } = await supabase
      .from('profiles')
      .update(data)
      .eq('id', user.id);

    if (!error) {
      setUser({ ...user, ...data });
      toast.success("Perfil actualizado", { description: "Tus datos se han actualizado correctamente." });
    } else {
      toast.error("Error al actualizar perfil", { description: error.message });
    }

    return { error };
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

