import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from '@remix-run/react';
import { Analytics } from '@vercel/analytics/react';
import { GlobalPendingIndicator } from '@/components/global-pending-indicator';
import {
  ThemeSwitcherSafeHTML,
  ThemeSwitcherScript,
} from '@/components/theme-switcher';

import type { LinksFunction } from '@remix-run/node';
import stylesheet from '@/tailwind.css?url';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesheet },
];

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeSwitcherSafeHTML lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <ThemeSwitcherScript />
      </head>
      <body className="h-screen bg-background font-sans antialiased">
        <GlobalPendingIndicator />
        {children}
        <ScrollRestoration />
        <Scripts />
        <Analytics />
      </body>
    </ThemeSwitcherSafeHTML>
  );
}

export default function Root() {
  return (
    <RootLayout>
      <Outlet />
    </RootLayout>
  );
}

/**
 * @see https://remix.run/docs/en/main/guides/errors
 */
export function ErrorBoundary() {
  const error = useRouteError();
  let status = 500;
  let message = 'An unexpected error occurred.';
  if (isRouteErrorResponse(error)) {
    status = error.status;
    switch (error.status) {
      case 404:
        message = 'Page Not Found';
        break;
    }
  } else {
    console.error(error);
  }

  return (
    <RootLayout>
      <main className="p-8">
        <h1 className="text-2xl font-bold">
          {status}
          &nbsp;
          {message}
        </h1>
      </main>
    </RootLayout>
  );
}
