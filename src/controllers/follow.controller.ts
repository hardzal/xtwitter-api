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
      if (followers.length === 0) {
        res.json({
          status: 204,
          data: 'Not found!',
        });
        return;
      }
      res.json({
        status: 200,
        message: 'Successfully get followers data!',
        data: followers,
      });
    } catch (error) {
      next(error);
    }
  }

  async getFollowingsByUserId(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      const followings = await followService.getFollowings(userId);
      if (followings.length === 0) {
        res.json({
          status: 204,
          data: 'Not found!',
        });
        return;
      }
      res.json({
        status: 200,
        message: 'Successfully get followers data!',
        data: followings,
      });
    } catch (error) {
      next(error);
    }
  }

  async createFollowByUserId(req: Request, res: Response, next: NextFunction) {
    /*  #swagger.requestBody = {
                  required: true,
                  content: {
                      "application/json": {
                          schema: {
                              $ref: "#/components/schemas/CreateFollowDTO"
                          }  
                      }
                  }
              } 
          */
    try {
      const body = req.body;
      const followingId = req.params.userId;
      const { followedId } = await createFollowSchema.validateAsync(body);
      if (followedId === followingId) {
        res.json({
          status: 403,
          message: "You can't follow your ownself",
        });
        return;
      }
      const follow = await followService.createFollow(followedId, followingId);

      if (!follow) {
        res.json({
          status: 500,
          message: 'Follow failed!',
        });
        return;
      }
      res.json({
        message: 'Follow success!',
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteFollowByUserId(req: Request, res: Response, next: NextFunction) {
    /*  #swagger.requestBody = {
                  required: true,
                  content: {
                      "application/json": {
                          schema: {
                              $ref: "#/components/schemas/DeleteFollowDTO"
                          }  
                      }
                  }
              } 
          */
    try {
      const body = req.body;
      const followingId = req.params.userId;
      const { followedId } = await deleteFollowSchema.validateAsync(body);
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
