import { IUsers, Users } from '@/models/users';

export async function getUsers() {
  const users = await Users.find();
  return users;
}

export async function getUserByEmail(email: string) {
  const user = await Users.findOne({ email }).exec();
  return user;
}

type CreateProps = Pick<IUsers, 'email' | 'name' | 'image'>;

export async function createUser(props: CreateProps) {
  const newUser = await Users.create(props);

  return newUser;
}

export async function findOrCreateUser(props: CreateProps) {
  const user = await getUserByEmail(props.email);

  if (user) return user;

  return await createUser(props);
}

type UpdateProps = Omit<IUsers, 'createdAt' | 'updatedAt'>;

export async function updateUser(user: UpdateProps) {
  const updatedUser = await Users.findOneAndUpdate(
    { email: user.email },
    user
  ).exec();
  return updatedUser;
}
