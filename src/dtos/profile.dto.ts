import { Profile, User } from '@prisma/client';

export type ProfileUser = Profile & {
  username: User['username'];
  email: User['email'];
};

export type CreateProfileDTO = Pick<
  ProfileUser,
  'userId' | 'fullName' | 'avatar' | 'bannerURL' | 'bio'
>;

export type UpdateProfileDTO = Pick<
  ProfileUser,
  'fullName' | 'username' | 'avatar' | 'bannerURL' | 'bio'
>;
