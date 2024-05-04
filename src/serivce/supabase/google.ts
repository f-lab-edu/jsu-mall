import { createClient } from '@/utils/supabase/client';

export async function signInWithGoogle({ next = '/' }: { next?: string } = {}) {
  const supabase = createClient();
  const baseUrl = process.env.NEXT_PUBLIC_GOOGLE_CALLBACK_URL!;

  return await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      queryParams: {
        access_type: 'offline',
        prompt: 'consent'
      },
      redirectTo: `${baseUrl}?next=${next}`
    }
  });
}
