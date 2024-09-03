import { MetaFunction, Outlet, useRouteLoaderData } from '@remix-run/react';
import { LoaderFunctionArgs, json } from '@remix-run/server-runtime';
import { authenticator } from '@/services/auth.server';

import Footer from '@/components/footer';
import Header from '@/components/header';

import { ScrollArea } from '@/components/ui/scroll-area';

export const meta: MetaFunction = () => {
  return [
    { title: 'Finance App' },
    { name: 'description', content: 'Welcome to FinTech!' },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await authenticator.isAuthenticated(request);

  return json({ user });
}

export function useUserLoaderData() {
  const data = useRouteLoaderData<typeof loader>('routes/_app');
  if (data === undefined) {
    throw new Error(
      'useUserLoaderData must be used within the routes/_app route or its children'
    );
  }
  return data;
}

export default function AppLayout() {
  return (
    <>
      <div className="flex flex-col justify-between w-full h-full min-h-screen">
        <Header />
        <ScrollArea className="flex-auto w-full max-w-2xl px-4 py-4 sm:px-6 md:py-6 mx-auto">
          <main>
            <Outlet />
          </main>
        </ScrollArea>
        <Footer />
      </div>
    </>
  );
}
