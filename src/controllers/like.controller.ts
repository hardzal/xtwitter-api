import likesService from '../services/like.service';
import { NextFunction, Request, Response } from 'express';
import {
  createLikeSchema,
  deleteLikeSchema,
} from '../utils/schemas/like.schema';
import likeService from '../services/like.service';

class LikeController {
  async getLikes(req: Request, res: Response, next: NextFunction) {
    try {
      const likes = await likesService.getLikes();
      res.json(likes);
    } catch (error) {
      next(error);
    }
  }

  async getLikesByTheadId(req: Request, res: Response, next: NextFunction) {
    try {
      const { threadId } = req.params;
      const likes = await likesService.getLikesByThreadId(threadId);
      res.json(likes);
    } catch (error) {
      next(error);
    }
  }

  // user likes
  async getLikesByUserId(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      const likes = await likesService.getLikesByUserId(userId);
      res.json(likes);
    } catch (error) {
      next(error);
    }
  }

  // get by id & parameter optional=threadId&userId
  async getLike(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const like = await likesService.getLikeById(id);
      res.json(like);
    } catch (error) {
      next(error);
    }
  }

  async createLike(req: Request, res: Response, next: NextFunction) {
    /*  #swagger.requestBody = {
                  required: true,
                  content: {
                      "application/json": {
                          schema: {
                              $ref: "#/components/schemas/CreateLikeDTO"
                          }  
                      }
                  }
              } 
          */
    try {
      const body = req.body;
      const userId = req.user.id;
      const { threadId } = await createLikeSchema.validateAsync(body);

      const like = await likesService.getLike(userId, threadId);
      if (like) {
        res.json({
          status: 406,
          message: "You can't like twice!",
        });
        return;
      }
      await likesService.createLike(userId, threadId);
      res.json({
        message: 'Like success!',
      });
    } catch (error) {
      next(error);
    }
    return;
  }

  async deleteLike(req: Request, res: Response, next: NextFunction) {
    try {
      const { threadId } = await deleteLikeSchema.validateAsync(req.params);
      const userId = req.user.id;
      const like = await likeService.getLike(userId, threadId);
      if (!like) {
        res.status(404).json({
          message: 'Like not found!',
        });
        return;
      }
      await likesService.deleteLikeById(like.id);
      res.json({
        message: 'Unlike success!',
      });
    } catch (error) {
      next(error);
    }
    return;
  }
}

export default new LikeController();
