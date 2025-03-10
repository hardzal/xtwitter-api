import { Follow } from '@prisma/client';

export type CreateFollowDTO = Pick<Follow, 'followedId' | 'followingId'>;

export type DeleteFollowDTO = Pick<Follow, 'followedId' | 'followingId'>;
