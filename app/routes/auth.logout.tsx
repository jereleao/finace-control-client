import { destroySession, getSession } from '@/services/session.server';
import { LoaderFunctionArgs, redirect } from '@remix-run/server-runtime';

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get('cookie'));
  return redirect('/', {
    headers: {
      'Set-Cookie': await destroySession(session),
    },
  });
}
