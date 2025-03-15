import express from 'express';

const router = express.Router();

import { authCheck } from '../middlewares/auth-check.middleware';
import { rateLimit } from '../middlewares/rate-limit.middleware';
import likereplyController from '../controllers/likereply.controller';

router.use(rateLimit('likes'));

router.get('/', likereplyController.getLikes);
router.get('/::replyId', likereplyController.getLikesByReplyId);
router.get('/:userId', likereplyController.getLikesByUserId);
router.get('/:id', likereplyController.getLike);
router.post('/', authCheck, likereplyController.createLike);
router.delete('/:replyId', authCheck, likereplyController.deleteLike);

export default router;
