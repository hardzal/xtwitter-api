import { LikeReply } from '@prisma/client';

export type CreateLikeDTO = Pick<LikeReply, 'replyId'>;

export type DeleteLikeDTO = Pick<LikeReply, 'replyId'>;
