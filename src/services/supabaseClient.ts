import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://njhdftgkqdwvgzatvcpo.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qaGRmdGdrcWR3dmd6YXR2Y3BvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTExOTg2NDYsImV4cCI6MjEwNjc3NDY0Nn0.1Sb5SMtY2YV4RYFLUdULrIdMCkJgHA1aUrBvpcFhzvM';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);
