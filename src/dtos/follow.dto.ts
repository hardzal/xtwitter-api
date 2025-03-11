import { Follow } from '@prisma/client';

export type CreateFollowDTO = Pick<Follow, 'followedId'>;

export type DeleteFollowDTO = Pick<Follow, 'followedId'>;
