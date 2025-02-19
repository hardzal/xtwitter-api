import { Thread } from '@prisma/client';

export type CreateThreadDTO = Pick<Thread, 'content' | 'Images'>;

export type UpdateThreadDTO = Pick<Thread, 'content' | 'Images'>;
