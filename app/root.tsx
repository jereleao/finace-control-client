import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  json,
  useRouteLoaderData,
} from '@remix-run/react';
import { Analytics } from '@vercel/analytics/react';

import type { LinksFunction, LoaderFunctionArgs } from '@remix-run/node';
import stylesheet from '@/tailwind.css?url';
import { authenticator } from '@/services/auth.server';

import Footer from '@/components/footer';
import Header from '@/components/header';
import { ScrollArea } from '@/components/ui/scroll-area';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesheet },
];

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await authenticator.isAuthenticated(request);

  return json({ user });
}

export function useUserLoaderData() {
  return useRouteLoaderData<typeof loader>('root');
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="h-screen bg-background font-sans antialiased">
        <div className="flex flex-col justify-between w-full h-full min-h-screen">
          <Header />
          <ScrollArea className="flex-auto w-full max-w-3xl px-4 py-4 sm:px-6 md:py-6">
            <main>{children}</main>
          </ScrollArea>
          <Footer />
        </div>
        <ScrollRestoration />
        <Scripts />
        <Analytics />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
