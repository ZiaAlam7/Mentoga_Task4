import { cookies } from 'next/headers';
import { getAuth } from 'firebase-admin/auth';
import { initializeApp, cert, getApps } from 'firebase-admin/app';

// export const runtime = 'edge';

const serviceAccount = {
  type: "service_account",
  project_id: "mentoga-task4",
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,
  universe_domain: "googleapis.com",
};

if (!getApps().length) {
  initializeApp({ credential: cert(serviceAccount) });
}

export async function POST(req) {
  const { token, email } = await req.json();

  try {
    const decodedToken = await getAuth().verifyIdToken(token);

    const cookieStore =  await  cookies();
    cookieStore.set('__session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24,
      path: '/',
    });
    cookieStore.set('__logged_email', email, {
      httpOnly: false,
      maxAge: 60 * 60 * 24,
      path: '/',
    });

    return new Response(JSON.stringify({ status: 'success' }), {
      status: 200,
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Invalid token' }), {
      status: 401,
    });
  }
}
