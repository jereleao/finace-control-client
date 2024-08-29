import { redirect, type ActionFunctionArgs } from '@remix-run/node';
import { authenticator } from '@/services/auth.server';

export let loader = () => redirect('/auth/login');

export let action = ({ request }: ActionFunctionArgs) => {
  return authenticator.authenticate('google', request);
};
