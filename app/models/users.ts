import { ObjectWithId } from '@/lib/types';
import { mongoose } from '@/services/db.server';
import { Model, Schema, model } from 'mongoose';

export interface IUser extends ObjectWithId {
  name: string;
  email: string;
  image: string;
  settings: {
    primaryCurrency: Schema.Types.ObjectId;
  };
  createdAt: Date;
  updatedAt: Date;
}

const UsersSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    image: String,
    settings: {
      primaryCurrency: {
        type: Schema.Types.ObjectId,
        ref: 'currencies',
      },
    },
  },
  { timestamps: true }
);

export const Users =
  (mongoose.models.users as Model<IUser>) || model<IUser>('users', UsersSchema);
