import express from 'express';
import threadController from '../controllers/thread.controller';
import { authCheck } from '../middlewares/auth-check.middleware';
import { uploadImage } from '../middlewares/upload.middleware';

const router = express.Router();

router.get('/', threadController.getThreads);
router.get('/:id', threadController.getThreadById);
router.post(
  '/',
  authCheck,
  uploadImage.single('images'),
  threadController.createThread
);
router.patch(
  '/:id',
  authCheck,
  uploadImage.single('images'),
  threadController.updateThread
);
router.delete(
  '/',
  authCheck,
  uploadImage.single('images'),
  threadController.deleteThread
);

export default router;
