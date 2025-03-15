import express from 'express';
import followController from '../controllers/follow.controller';

const router = express.Router();

// rekoemdasi akun
router.get('/', followController.getFollows);

router.get('/:userId/followers', followController.getFollowersByUserId);
router.get('/:userId/followings', followController.getFollowingsByUserId);

router.post('/:userId', followController.createFollowByUserId);
router.delete('/:userId', followController.deleteFollowByUserId);

export default router;
