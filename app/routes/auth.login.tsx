import { SignInWithGoogle } from '@/components/auth-components';
import { authenticator } from '@/services/auth.server';
import { commitSession, getSession } from '@/services/session.server';
import { LoaderFunctionArgs, json } from '@remix-run/server-runtime';

export async function loader({ request }: LoaderFunctionArgs) {
  await authenticator.isAuthenticated(request, {
    successRedirect: '/',
  });

  let session = await getSession(request.headers.get('cookie'));
  let error = session.get(authenticator.sessionErrorKey);
  return json(
    { error },
    {
      headers: {
        'Set-Cookie': await commitSession(session),
      },
    }
  );
}

export default function Login() {
  return (
    <div className="flex items-center justify-center w-full min-h-screen">
      <div className="flex flex-col justify-between bg-secondary p-4 rounded-md">
        <SignInWithGoogle />
      </div>
    </div>
  );
}
