import express from 'express';
import replyController from '../controllers/reply.controller';

const router = express.Router();

router.get('/', replyController.getReplies);
router.get('/:id', replyController.getReplyById);
router.post('/', replyController.createReply);
router.put('/:id', replyController.updateReplyById);
router.delete('/:id', replyController.deleteReplyById);

export default router;
