import { Form, Link, useLoaderData } from '@remix-run/react';
import { LoaderFunctionArgs, json } from '@remix-run/server-runtime';
import { Pencil1Icon, PlusIcon, TrashIcon } from '@radix-ui/react-icons';

import { authenticator } from '@/services/auth.server';
import { getCategories } from '@/services/categories.server';

import { Button } from '@/components/ui/button';

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
                  <Form
                    method="post"
                    action={`/category/${category._id}/delete`}
                  >
                    <Button
                      variant="outline"
                      aria-label="Delete Category"
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
                      <span className="sr-only">Edit</span>
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
