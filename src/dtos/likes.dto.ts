import { Like } from '@prisma/client';

export type CreateLikeDTO = Pick<Like, 'threadId' | 'userId'>;

export type DeleteLikeDTO = Pick<Like, 'threadId' | 'userId'>;
