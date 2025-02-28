import express from 'express';
import replyController from '../controllers/reply.controller';
import { authCheck } from '../middlewares/auth-check.middleware';
import { rateLimit } from '../middlewares/rate-limit.middleware';

const router = express.Router();
router.use(rateLimit('reply'));
router.get('/:threadId', replyController.getReplies);
router.post('/:threadId', authCheck, replyController.createReply);
router.get('/:id', replyController.getReplyById);
router.put('/:id', replyController.updateReplyById);
router.delete('/:id', replyController.deleteReplyById);

export default router;
