import express from 'express';
import threadController from '../controllers/thread.controller';

const router = express.Router();

router.get('/', threadController.getThreads);
router.get('/:id', threadController.getThreadById);
router.post('/', threadController.createThread);
router.patch('/:id', threadController.updateThread);
router.delete('/:id', threadController.deleteThread);

export default router;
