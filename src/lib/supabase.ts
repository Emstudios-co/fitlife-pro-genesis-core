
import { createClient } from "@supabase/supabase-js";
import { toast } from "@/components/ui/sonner";

// Inicializar cliente de Supabase con verificación de variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Verificar si las variables de entorno están definidas
let supabase: any = null;

try {
  if (!supabaseUrl || !supabaseKey) {
    console.error("Supabase environment variables are missing");
    if (typeof window !== "undefined") {
      toast.error("Error de configuración", { 
        description: "No se pudo conectar con Supabase. Compruebe las variables de entorno." 
      });
    }
  } else {
    supabase = createClient(supabaseUrl, supabaseKey);
  }
} catch (error) {
  console.error("Failed to initialize Supabase client:", error);
}

// Function to check if Supabase is initialized
export const isSupabaseInitialized = () => {
  return supabase !== null;
};

export { supabase };
