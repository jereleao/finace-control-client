import { ObjectWithId } from '@/lib/types';
import { Categories, ICategory } from '@/models/categories';
import { Types } from 'mongoose';

export async function getCategories({
  _id: userId,
}: ObjectWithId): Promise<ICategory[]> {
  const data = await Categories.find({ userId });

  return data;
}

export async function getCategory(id: string): Promise<ICategory | null> {
  const _id = new Types.ObjectId(id);

  const data = await Categories.findOne({ _id });

  return data;
}

type CreateOrUpdateProps = Omit<ICategory, '_id' | 'createdAt' | 'updatedAt'>;

export async function createCategory(props: CreateOrUpdateProps) {
  const newData = await Categories.create(props);

  return newData;
}

export async function updateCategory(id: string, props: CreateOrUpdateProps) {
  const _id = new Types.ObjectId(id);

  const updatedData = await Categories.findOneAndUpdate({ _id }, props).exec();

  return updatedData;
}

export async function deleteCategory(id: string) {
  const _id = new Types.ObjectId(id);

  await Categories.findByIdAndDelete({ _id }).exec();
}
