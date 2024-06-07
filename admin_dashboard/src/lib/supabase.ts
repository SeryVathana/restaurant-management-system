import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://htbeabjokaxgtcmsztuy.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh0YmVhYmpva2F4Z3RjbXN6dHV5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxNzcyODA4OCwiZXhwIjoyMDMzMzA0MDg4fQ.5IEBA-GvpdqAh3oW35xjuYp88S9_5YJYpg9PILyQbqo"
);
