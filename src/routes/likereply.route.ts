import express from 'express';

const router = express.Router();

import { authCheck } from '../middlewares/auth-check.middleware';
import { rateLimit } from '../middlewares/rate-limit.middleware';
import likeController from '../controllers/like.controller';

router.use(rateLimit('likes'));

router.get('/', likeController.getLikes);
router.get('/:threadId', likeController.getLikesByTheadId);
router.get('/:userId', likeController.getLikesByUserId);
router.get('/:id', likeController.getLike);
router.post('/', authCheck, likeController.createLike);
router.delete('/:threadId', authCheck, likeController.deleteLike);

export default router;
