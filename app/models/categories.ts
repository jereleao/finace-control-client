import { ObjectWithId } from '@/lib/types';
import { mongoose } from '@/services/db.server';
import { Model, Schema, Types, model } from 'mongoose';

export interface ICategory extends ObjectWithId {
  name: string;
  userId: Types.ObjectId;
  groupId?: Types.ObjectId;
}

const CategorySchema = new Schema<ICategory>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  groupId: {
    type: Schema.Types.ObjectId,
    ref: 'category-groups',
  },
});

export const Categories =
  (mongoose.models.categories as Model<ICategory>) ||
  model<ICategory>('categories', CategorySchema);
