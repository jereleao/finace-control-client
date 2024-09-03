import type { ActionFunctionArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import invariant from 'tiny-invariant';

import { deleteCategory } from '@/services/categories.server';

export const action = async ({ params }: ActionFunctionArgs) => {
  invariant(params.categoryId, 'Missing categoryId param');
  await deleteCategory(params.categoryId);
  return redirect(`/categories`);
};
