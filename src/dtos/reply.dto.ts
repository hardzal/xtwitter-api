import { Reply } from '@prisma/client';

export type CreateReplyDTO = Pick<Reply, 'content'>;

export type UpdateReplyDTO = Pick<Reply, 'content' | 'images'>;
