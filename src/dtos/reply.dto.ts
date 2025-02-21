import { Reply } from '@prisma/client';

export type CreateReplyDTO = Pick<
  Reply,
  'threadId' | 'userId' | 'content' | 'images'
>;

export type UpdateReplyDTO = Pick<Reply, 'content' | 'images'>;
