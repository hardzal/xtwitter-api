import { Profile, User } from '../../node_modules/.prisma/client/index';

type UserProfile = User & {
  fullName: Profile['fullName'];
  bio: Profile['bio'];
  avatar: Profile['avatar'];
  bannerURL: Profile['bannerURL'];
};

export type CreateUserDTO = Pick<
  UserProfile,
  'email' | 'username' | 'password' | 'fullName'
>;

export type UpdateUserDTO = Pick<UserProfile, 'email' | 'username'>;

export type UpdateProfileDTO = Pick<
  UserProfile,
  'fullName' | 'bio' | 'avatar' | 'bannerURL'
>;
