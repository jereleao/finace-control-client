import { Form, Link, useLoaderData } from '@remix-run/react';
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  json,
} from '@remix-run/server-runtime';
import { PlusIcon, TrashIcon } from '@radix-ui/react-icons';
import { namedAction } from 'remix-utils/named-action';
import invariant from 'tiny-invariant';

import { authenticator } from '@/services/auth.server';
import { deleteCategory, getCategories } from '@/services/categories.server';

import { Button } from '@/components/ui/button';

export async function action({ request }: ActionFunctionArgs) {
  return namedAction(request, {
    async delete() {
      const formData = await request.formData();

      const categoryId = formData.get('categoryId') as string;

      invariant(categoryId, 'Missing categoryId');

      await deleteCategory(categoryId);

      return new Response(null, { status: 204 });
    },
  });
}

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/',
  });

  const categories = await getCategories(user);

  return json({ categories });
}

export default function Categories() {
  const { categories } = useLoaderData<typeof loader>();

  return (
    <div>
      <div>
        {categories.length ? (
          <ul>
            {categories.map(category => (
              <li key={category._id}>
                <Form
                  method="post"
                  action="?/delete"
                  className="flex items-center justify-between"
                >
                  <label>{category.name}</label>
                  <Button
                    variant="outline"
                    aria-label="Remove from favorites"
                    name="categoryId"
                    value={category._id}
                    size="icon"
                    className="rounded-full h-8 w-8 p-0"
                  >
                    <TrashIcon className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </Form>
              </li>
            ))}
          </ul>
        ) : (
          <p>
            <i>No categories</i>
          </p>
        )}
      </div>
    </div>
  );
}
