import express from 'express';
// import RedisClient from 'ioredis';
// import { rateLimit } from 'express-rate-limit';
// import { RedisStore } from 'rate-limit-redis';

import likeController from '../controllers/like.controller';
import { authCheck } from '../middlewares/auth-check.middleware';
import { rateLimit } from '../middlewares/rate-limit.middleware';

const router = express.Router();

// const client = new RedisClient();

// const limiter = rateLimit({
//   windowMs: 3 * 60 * 1000,
//   limit: 100,
//   standardHeaders: 'draft-8',
//   legacyHeaders: false,
//   message: {
//     message: 'Too many request, please try again later',
//   },
//   store: new RedisStore({
//     // @ts-expect-error - Known issue: the `call` function is not present in @types/ioredi
//     sendCommand: (...args: string[]) => client.call(...args),
//   }),
// });

router.use(rateLimit('likes'));

router.get('/', likeController.getLikes);
router.get('/:threadId', likeController.getLikesByTheadId);
router.get('/:userId', likeController.getLikesByUserId);
router.get('/:id', likeController.getLike);
router.post('/', authCheck, likeController.createLike);
router.delete('/:threadId', authCheck, likeController.deleteLike);

export default router;
