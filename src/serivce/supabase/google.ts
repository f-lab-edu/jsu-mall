import { createClient } from '@/utils/supabase/client';

export async function signInWithGoogle({ next = '/' }: { next?: string } = {}) {
  const supabase = createClient();

  return await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      queryParams: {
        access_type: 'offline',
        prompt: 'consent'
      },
      redirectTo: `http://localhost:3000/auth/callback?next=${next}`
    }
  });
}
