import { Form, Link, useLoaderData } from '@remix-run/react';
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  json,
  redirect,
} from '@remix-run/server-runtime';
import { Pencil1Icon, PlusIcon, TrashIcon } from '@radix-ui/react-icons';
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

      return redirect('/categories');
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
          <ul className="space-y-1">
            {categories.map(category => (
              <li
                key={category._id}
                className="flex items-center justify-between"
              >
                <label>{category.name}</label>
                <div className="flex gap-3">
                  <Form method="post" action="?/delete">
                    <Button
                      variant="outline"
                      aria-label="Delete Category"
                      name="categoryId"
                      value={category._id}
                      size="icon"
                      className="rounded-full h-8 w-8 p-0"
                    >
                      <TrashIcon className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </Form>
                  <Link to={`/category/${category._id}`}>
                    <Button
                      variant="outline"
                      aria-label="Edit Category"
                      size="icon"
                      className="rounded-full h-8 w-8 p-0"
                    >
                      <Pencil1Icon className="h-4 w-4" />
                      <span className="sr-only">Add new</span>
                    </Button>
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>
            <i>No categories</i>
          </p>
        )}
      </div>
      <Link to={`/category/new`}>
        <Button size="icon" className="rounded-full absolute bottom-4 right-4">
          <PlusIcon className="h-7 w-7 p-1" />
          <span className="sr-only">Add new</span>
        </Button>
      </Link>
    </div>
  );
}
