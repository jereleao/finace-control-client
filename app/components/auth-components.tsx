import { Button } from '@/components/ui/button';
import { Form } from '@remix-run/react';

export function SignIn({
  provider,
  ...props
}: { provider?: string } & React.ComponentPropsWithRef<typeof Button>) {
  return (
    <Form action="/auth/google" method="post">
      <Button {...props}>Login with Google</Button>
    </Form>
  );
}

export function SignOut(props: React.ComponentPropsWithRef<typeof Button>) {
  return (
    <Form action="/auth/logout" method="get" className="w-full">
      <Button variant="ghost" className="w-full p-0" {...props}>
        Logout
      </Button>
    </Form>
  );
}
