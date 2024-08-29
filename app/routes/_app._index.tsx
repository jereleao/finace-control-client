import { Outlet, useRouteLoaderData } from '@remix-run/react';
import { LoaderFunctionArgs, json } from '@remix-run/server-runtime';
import { authenticator } from '@/services/auth.server';

import Footer from '@/components/footer';
import Header from '@/components/header';

import { ScrollArea } from '@/components/ui/scroll-area';

export default function AppIndex() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <h1>Welcome to Remix@Edge</h1>
    </div>
  );
}
