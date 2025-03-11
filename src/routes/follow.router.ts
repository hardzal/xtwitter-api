import express from 'express';
import followController from '../controllers/follow.controller';

const router = express.Router();

// rekoemdasi akun
router.get('/', followController.getFollows);

router.get('/followers/:userId', followController.getFollowersByUserId);
router.get('/folowings/:userId', followController.getFollowingsByUserId);

router.post('/:userId', followController.createFollowByUserId);
router.delete('/:userId', followController.deleteFollowByUserId);

export default router;
