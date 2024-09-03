import { Types } from 'mongoose';

export type ObjectWithId<T = {}> = T & { _id: Types.ObjectId };
