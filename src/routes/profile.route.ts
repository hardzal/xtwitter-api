import express from 'express';
import profileController from '../controllers/profile.controller';
import { authCheck } from '../middlewares/auth-check.middleware';
import { uploadImage } from '../middlewares/upload.middleware';

const router = express.Router();

router.get('/all', profileController.getProfiles);
router.get('/:username', profileController.getProfileByUsername);
router.get('/', authCheck, profileController.getProfileById);
router.put(
  '/:id',
  authCheck,
  uploadImage.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'bannerURL', maxCount: 1 },
  ]),
  profileController.updateProfile
);

export default router;
