/**
 * @see https://remix.run/resources/remix-auth
 */
import { Authenticator } from 'remix-auth';
import { sessionStorage } from '@/services/session.server';

import { GoogleStrategy } from 'remix-auth-google';

export type User = {
  displayName: string;
  photo: string;
  email: string;
};

export let authenticator = new Authenticator<User>(sessionStorage);

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

    // Get the user data from your DB or API using the tokens and profile
    // return User.findOrCreate({ email: profile.emails[0].value });
    return { displayName, photo, email };
  }
);

authenticator.use(googleStrategy);
