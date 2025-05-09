import express from 'express';
import threadController from '../controllers/thread.controller';
import { authCheck } from '../middlewares/auth-check.middleware';
import { uploadImage } from '../middlewares/upload.middleware';
import { rateLimit } from '../middlewares/rate-limit.middleware';

const router = express.Router();
router.use(rateLimit('thread'));
router.get('/:userId/all', threadController.getThreads);
router.get('/:userId/user', threadController.getThreadByUserId);
router.get('/:id', authCheck, threadController.getThreadById);
router.get('/:userId/images', threadController.getAllImagesByUserId);
router.post(
  '/',
  authCheck,
  uploadImage.single('images'),
  threadController.createThread
);
router.put(
  '/:id',
  authCheck,
  uploadImage.single('images'),
  threadController.updateThread
);
router.delete(
  '/:id',
  authCheck,
  uploadImage.single('images'),
  threadController.deleteThread
);

export default router;
