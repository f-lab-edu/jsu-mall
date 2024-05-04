'use client';

import { signInWithGoogle } from '@/serivce/supabase/google';

export default function LoginPage() {
  return (
    <button onClick={() => signInWithGoogle({ next: '/' })}>구글 로그인</button>
  );
}
