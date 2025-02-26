import express from 'express';
import RedisClient from 'ioredis';
import { rateLimit } from 'express-rate-limit';
import { RedisStore } from 'rate-limit-redis';

import likeController from '../controllers/like.controller';

const router = express.Router();

const client = new RedisClient();

const limiter = rateLimit({
  windowMs: 3 * 60 * 1000,
  limit: 100,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: {
    message: 'Too many request, please try again later',
  },
  store: new RedisStore({
    // @ts-expect-error - Known issue: the `call` function is not present in @types/ioredi
    sendCommand: (...args: string[]) => client.call(...args),
  }),
});

router.use(limiter);

router.get('/', likeController.getLikes);
router.get('/:threadId', likeController.getLikesByTheadId);
router.get('/:userId', likeController.getLikesByUserId);
router.get('/:id', likeController.getLike);
router.post('/', likeController.createLike);
router.delete('/:id', likeController.deleteLike);

export default router;
