import express from 'express';
import profileController from '../controllers/profile.controller';

const router = express.Router();

router.get('/', profileController.getProfiles);
router.get('/:id', profileController.getProfileById);
router.get('/:username', profileController.getProfileByUsername);
router.post('/', profileController.CreateProfile);
router.put('/:id', profileController.updateProfile);
router.delete('/:id', profileController.deleteProfile);
