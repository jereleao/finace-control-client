/**
 * @see https://remix.run/resources/remix-auth
 */
import { Authenticator } from 'remix-auth';
import { IUser } from '@/models/users';
import { sessionStorage } from '@/services/session.server';
import { findOrCreateUser } from '@/services/users.server';

import { GoogleStrategy } from 'remix-auth-google';

export let authenticator = new Authenticator<IUser>(sessionStorage);

if (!process.env.AUTH_GOOGLE_ID)
  throw new Error('Invalid/Missing environment variable: "AUTH_GOOGLE_ID"');
if (!process.env.AUTH_GOOGLE_SECRET)
  throw new Error('Invalid/Missing environment variable: "AUTH_GOOGLE_SECRET"');

/**
 * @see https://github.com/pbteja1998/remix-auth-google
 */
const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.AUTH_GOOGLE_ID,
    clientSecret: process.env.AUTH_GOOGLE_SECRET,
    callbackURL: 'http://localhost:5173/auth/google/callback',
  },
  async ({ profile }) => {
    const {
      displayName,
      photos: [{ value: photo }],
      emails: [{ value: email }],
    } = profile;

    return await findOrCreateUser({ email, name: displayName, image: photo });
  }
);

authenticator.use(googleStrategy);
