import { mongoose } from '@/services/db.server';
import { Model, Schema, Types, model } from 'mongoose';

export interface ICategoryGroups {
  name: string;
  userId: Types.ObjectId;
  description?: string;
  budget?: number;
}

const CategoryGroupsSchema = new Schema<ICategoryGroups>({
  name: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  description: String,
  budget: Number,
});

export const CategoryGroups =
  (mongoose.models['category-groups'] as Model<ICategoryGroups>) ||
  model<ICategoryGroups>('category-groups', CategoryGroupsSchema);
