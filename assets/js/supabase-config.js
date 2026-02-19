const SUPABASE_URL = 'https://nhnbqbcyvdeltigeqsis.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5obmJxYmN5dmRlbHRpZ2Vxc2lzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE0NTk0NjksImV4cCI6MjA4NzAzNTQ2OX0.Kn8OxgHPDsIoTt450G8kiLkYt39OXH9cOr6iAijUESg';

const { createClient } = supabase;

const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabaseClient;
