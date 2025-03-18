import { Profile, User } from '../../node_modules/.prisma/client/index';

type UserProfile = User & {
  fullName: Profile['fullName'];
};

export type LoginDTO = Pick<User, 'email' | 'password'>;

export type RegisterDTO = Pick<
  UserProfile,
  'email' | 'username' | 'password' | 'fullName'
>;

export type forgotPasswordDTO = Pick<User, 'email'>;

export type ResetPasswordDTO = {
  oldPassword: string;
  newPassword: string;
};

export type ChangePasswordDTO = {
  oldPassword: string;
  newPassword: string;
};
