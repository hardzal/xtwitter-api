import express from 'express';
import followController from '../controllers/follow.controller';
import { authCheck } from '../middlewares/auth-check.middleware';

const router = express.Router();

// rekoemdasi akun
router.get('/suggest', authCheck, followController.getFollows);
router.get('/:userId/count', followController.getFollowCountByUserId);
router.get('/:userId/followers', followController.getFollowersByUserId);
router.get('/:userId/followings', followController.getFollowingsByUserId);
router.get('/:userId/follow', authCheck, followController.getFollowUserProfile);

router.post('/:userId', authCheck, followController.createFollowByUserId);
router.delete('/:userId', authCheck, followController.deleteFollowByUserId);

export default router;
