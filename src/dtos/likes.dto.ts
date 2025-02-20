import { Like } from '@prisma/client';

export type CreateLikesDTO = Pick<Like, 'threadId' | 'userId'>;

export type DeleteLikesDTO = Pick<Like, 'threadId' | 'userId'>;
