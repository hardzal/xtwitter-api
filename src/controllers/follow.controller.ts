import { NextFunction, Request, Response } from 'express';
import followService from '../services/follow.service';
import {
  createFollowSchema,
  deleteFollowSchema,
} from '../utils/schemas/follows.schema';

class FollowController {
  async getFollows() {}

  async getFollowersByUserId(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      const followers = await followService.getFollowers(userId);

      res.json(followers);
    } catch (error) {
      next(error);
    }
  }

  async getFollowingsByUserId(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      const followings = await followService.getFollowings(userId);

      res.json(followings);
    } catch (error) {
      next(error);
    }
  }

  async createFollowByUserId(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body;
      const { followedId, followingId } =
        await createFollowSchema.validateAsync(body);

      await followService.createFollow(followedId, followingId);
      res.json({
        message: 'Follow success!',
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteFollowByUserId(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body;
      const { followedId, followingId } =
        await deleteFollowSchema.validateAsync(body);
      const follow = await followService.getFollowsDetails(
        followedId,
        followingId
      );

      if (!follow) {
        res.json({
          status: 404,
          message: 'Follows detail not found',
        });
        return;
      }

      await followService.deleteFollow(follow.id);
      res.json({
        message: 'Unfollow success!',
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new FollowController();
