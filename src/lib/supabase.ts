
import { createClient } from "@supabase/supabase-js";
import { toast } from "@/components/ui/sonner";

// URL y clave de Supabase (públicas)
const supabaseUrl = "https://ndjgdelnvnzsmpjkfkum.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5kamdkZWxudm56c21wamtma3VtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcyNTgxMjUsImV4cCI6MjA2MjgzNDEyNX0.xoAIZSD54cSp3gq1KF1kUzek3ATca2R5UEluYcahEMs";

// Inicializar cliente de Supabase con manejo de errores
let supabase: ReturnType<typeof createClient> | null = null;

try {
  supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      storage: localStorage,
    }
  });
  console.log("Supabase client initialized successfully");
} catch (error) {
  console.error("Failed to initialize Supabase client:", error);
  if (typeof window !== "undefined") {
    toast.error("Error de configuración", { 
      description: "No se pudo conectar con Supabase."
    });
  }
}

// Function to check if Supabase is initialized
export const isSupabaseInitialized = () => {
  return supabase !== null;
};

export { supabase };
