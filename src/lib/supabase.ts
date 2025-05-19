
import { createClient } from "@supabase/supabase-js";
import { toast } from "sonner";

// URL y clave de Supabase (públicas)
const supabaseUrl = "https://ndjgdelnvnzsmpjkfkum.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5kamdkZWxudm56c21wamtma3VtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcyNTgxMjUsImV4cCI6MjA2MjgzNDEyNX0.xoAIZSD54cSp3gq1KF1kUzek3ATca2R5UEluYcahEMs";

// Inicializar cliente de Supabase con manejo de errores
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    storage: localStorage,
  }
});

// Function to check if Supabase is initialized
export const isSupabaseInitialized = () => {
  return supabase !== null;
};

console.log("Supabase client initialized from unified client file");

