
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Toaster } from "@/components/ui/sonner";

// Check if required Supabase environment variables are set
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error(
    "Supabase environment variables are missing. " +
    "Please make sure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are correctly set."
  );
}

// Render the app normally - our error handling in AuthContext will show appropriate UI messages
createRoot(document.getElementById("root")!).render(
  <>
    <App />
    <Toaster position="top-right" />
  </>
);
