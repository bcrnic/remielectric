import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase environment variables not configured");
}

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

export interface Booking {
  id?: string;
  created_at?: string;
  name: string;
  phone: string;
  email?: string;
  service: string;
  date: string;
  time_slot: string;
  description?: string;
  status?: "pending" | "confirmed" | "completed" | "cancelled";
}

export interface ContactMessage {
  id?: string;
  created_at?: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  status?: "new" | "read" | "replied";
}
