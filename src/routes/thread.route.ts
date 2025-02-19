import express from 'express';
import threadController from '../controllers/thread.controller';
import { authCheck } from '../middlewares/auth-check.middleware';
import { initCloudinary } from '../middlewares/cloudinary.middleware';
import { uploadImage } from '../middlewares/upload.middleware';

const router = express.Router();

router.get('/', authCheck, threadController.getThreads);
router.get('/:id', threadController.getThreadById);
router.post(
  '/',
  authCheck,
  initCloudinary,
  uploadImage.single('images'),
  threadController.createThread
);
router.patch(
  '/:id',
  authCheck,
  initCloudinary,
  uploadImage.single('images'),
  threadController.updateThread
);
router.delete(
  '/:id',
  authCheck,
  initCloudinary,
  uploadImage.single('images'),
  threadController.deleteThread
);

export default router;
