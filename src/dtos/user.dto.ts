import { Profile, User } from '../../node_modules/.prisma/client/index';

type UserProfile = User & {
  fullName: Profile['fullName'];
};

export type CreateUserDTO = Pick<
  UserProfile,
  'email' | 'username' | 'password' | 'fullName'
>;

export type UpdateUserDTO = Pick<UserProfile, 'email' | 'username'>;
