import { NextFunction, Request, Response } from 'express';
import followService from '../services/follow.service';
import {
  createFollowSchema,
  deleteFollowSchema,
} from '../utils/schemas/follows.schema';
import userService from '../services/user.service';
class FollowController {
  // suggestion follows
  async getFollows(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req?.user.id;
      const userDetail = await userService.getUserById(userId);

      const users = await userService.getUsers();
      const userFollowing = await followService.getFollowings(userId);
      const userFollowed = await followService.getFollowers(userId);

      const followingIds = userFollowing.map((user) => user.followedId);
      const followedIds = userFollowed.map((user) => user.followingId);

      const newFollow = users
        .filter((user) => !followingIds.includes(user.id) && user.id !== userId)
        .map((user) => user);

      // user yang belum difollback
      const notFollow = users
        .filter(
          (user) =>
            !followedIds.includes(user.id) &&
            !followingIds.includes(user.id) &&
            user.id !== userId
        )
        .map((user) => user);
      console.log(notFollow);

      // sort by user already followed
      const newUser = newFollow.filter((user) => !notFollow.includes(user));

      newUser.map((user) => notFollow.push(user));

      // total user followed
      // total user liked
      // user already comment in our thread
      const newSuggest = notFollow.map((user) => ({
        user: userDetail,
        isFollowing: followedIds.includes(user.id),
        isFollowed: followingIds.includes(user.id),
        following: user,
      }));

      res.json({
        message: 'Succesfully get data',
        data: newSuggest.reverse(),
      });
    } catch (error) {
      next(error);
    }
    return;
  }

  async getFollowCountByUserId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { userId } = req.params;
      const follower = await followService.getFollowers(userId);
      const following = await followService.getFollowings(userId);

      const followerCount = follower.length;
      const followingCount = following.length;
      res.json({
        status: 200,
        message: 'Succesfully get follow data',
        data: {
          followerCount,
          followingCount,
        },
      });
    } catch (error) {
      next(error);
    }
  }

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
      const followingCount = followers.length;
      const newFollowers = [];

      for (const follow of followers) {
        // apakah user melakukan follow back
        const followUser = await followService.getFollowsDetails(
          follow.followingId,
          userId
        );
        const isFollowing = followUser ? true : false;

        newFollowers.push({
          ...follow,
          isFollowing,
        });
      }

      res.json({
        status: 200,
        message: 'Successfully get followers data!',
        data: newFollowers,
        followingCount,
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

      const newFollowings = [];

      for (const follow of followings) {
        const followUser = await followService.getFollowsDetails(
          userId,
          follow.followedId
        );
        const isFollowed = followUser ? true : false;

        newFollowings.push({
          ...follow,
          isFollowed,
        });
      }

      const followerCount = followings.length;
      res.json({
        status: 200,
        message: 'Successfully get followers data!',
        data: newFollowings,
        followerCount,
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
      const followingId = req.user.id;
      const { followedId } = await createFollowSchema.validateAsync(body);

      if (followedId === followingId) {
        res.json({
          status: 403,
          message: "You can't follow your ownself",
        });
        return;
      }
      const followInfo = await followService.getFollowings(followedId);

      if (followInfo === null) {
        console.log(followInfo);
        res.json({
          status: 403,
          message: "Can't follow again",
        });
        return;
      }
      console.log(followedId);
      console.log(followingId);

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
      const followingId = req.user.id;
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
