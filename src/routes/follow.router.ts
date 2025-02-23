import express from 'express';
import followController from '../controllers/follow.controller';

const router = express.Router();

router.get('/', followController.getFollows);
router.get('/followers/:userId', followController.getFollowersByUserId);
router.get('/followers/:username', followController.getFollowersByUsername);
router.get('/folowings/:userId', followController.getFollowingsByUserId);
router.get('/followings/:username', followController.getFollowingsByUsername);

router.delete('/:userId', followController.deleteFollowingByUserId);
router.delete('/:username', followController.deleteFollowingByUsername);

export default router;
