import express from 'express';
import likeController from '../controllers/like.controller';

const router = express.Router();

router.get('/', likeController.getLikes);
router.get('/:threadId', likeController.getLikesByTheadId);
router.get('/:userId', likeController.getLikesByUserId);
router.get('/:id', likeController.getLike);
router.post('/', likeController.createLike);
router.delete('/:id', likeController.deleteLike);

export default router;
