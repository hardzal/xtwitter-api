import { Profile } from '@prisma/client';

export type CreateProfileDTO = Pick<
  Profile,
  'userId' | 'fullName' | 'avatar' | 'bannerURL' | 'bio'
>;

export type UpdateProfileDTO = Pick<
  Profile,
  'fullName' | 'avatar' | 'bannerURL' | 'bio'
>;
