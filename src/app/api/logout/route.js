import { cookies } from 'next/headers';

export async function POST() {
  const cookieStore = cookies();


  cookieStore.set('__session', '', {
    path: '/',
    maxAge: 0,
  });

  return new Response(JSON.stringify({ message: 'Logged out' }), {
    status: 200,
  });
}
