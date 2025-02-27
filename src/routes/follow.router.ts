import express from 'express';
import followController from '../controllers/follow.controller';

const router = express.Router();

// rekoemdasi akun
router.get('/', followController.getFollows);

router.get('/followers/:userId', followController.getFollowersByUserId);
router.get('/followers/:username', followController.getFollowersByUsername);
router.get('/folowings/:userId', followController.getFollowingsByUserId);
router.get('/followings/:username', followController.getFollowingsByUsername);

router.post('/followers/:userId', followController.createFollowerByUserId);
router.post('/followings/:userId', followController.createFollowingByUserId);
router.delete('/:userId', followController.deleteFollowingByUserId);
router.delete('/:userId', followController.deleteFollowerByUserId);

export default router;
