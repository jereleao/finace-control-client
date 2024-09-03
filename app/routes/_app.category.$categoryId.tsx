import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import type { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { useRemixForm, getValidatedFormData } from 'remix-hook-form';
import { Form, useLoaderData, useNavigate } from '@remix-run/react';
import { Error } from 'mongoose';
import { MongoError } from 'mongodb';

import {
  createCategory,
  getCategory,
  updateCategory,
} from '@/services/categories.server';
import { authenticator } from '@/services/auth.server';
import { ICategory } from '@/models/categories';

import {
  FormProvider,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormRootMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const formSchema = zod.object({
  name: zod.string().min(2),
});

type FormData = zod.infer<typeof formSchema>;

const resolver = zodResolver(formSchema);

export const action = async ({ params, request }: ActionFunctionArgs) => {
  const {
    errors,
    data,
    receivedValues: defaultValues,
  } = await getValidatedFormData<FormData>(request, resolver);

  if (errors) {
    // The keys "errors" and "defaultValues" are picked up automatically by useRemixForm
    return json({ errors, defaultValues });
  }

  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/',
  });

  const updates = Object.assign(data, {
    userId: user._id,
  });

  try {
    if (params.categoryId) {
      await updateCategory(params.categoryId, updates);
    } else {
      await createCategory(updates);
    }
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      return json({
        errors: error.errors,
      });
    } else if ((error as MongoError).code === 11000) {
      return json({
        errors: {
          root: {
            type: 'server',
            message: 'A category with this this unique key already exists!',
          },
        },
      });
    }

    throw error;
  }

  return redirect(`/categories`);
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  let category: ICategory | null = null;

  if (params.categoryId) category = await getCategory(params.categoryId);

  return json({ category });
};

export default function EditCategory() {
  const { category } = useLoaderData<typeof loader>();

  const methods = useRemixForm<FormData>({
    mode: 'onSubmit',
    resolver,
    defaultValues: {
      name: category?.name,
    },
  });

  const navigate = useNavigate();

  return (
    <FormProvider {...methods}>
      <Form
        onSubmit={methods.handleSubmit}
        method="POST"
        className="space-y-4 p-1"
      >
        <FormField
          control={methods.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>Category identifier name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <p className="flex justify-end gap-3">
          <Button type="submit">Submit</Button>
          <Button type="button" variant="outline" onClick={() => navigate(-1)}>
            Cancel
          </Button>
        </p>
        <FormRootMessage />
      </Form>
    </FormProvider>
  );
}
