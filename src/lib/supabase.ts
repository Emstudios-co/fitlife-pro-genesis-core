
import { createClient } from "@supabase/supabase-js";
import { toast } from "sonner";

// URL and key from the successful connection (the one in integrations/supabase/client.ts)
const supabaseUrl = "https://aqtsvihaofcoyrxyxpiz.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxdHN2aWhhb2Zjb3lyeHl4cGl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2OTEwMzQsImV4cCI6MjA2MzI2NzAzNH0.frPDTG9rty9kgmM1qTs8AAbQ5KasIV7kXIA8WiU-FEo";

// Initialize Supabase client with error handling
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
