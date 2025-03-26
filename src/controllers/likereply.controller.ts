import { NextFunction, Request, Response } from 'express';
import likereplyService from '../services/likereply.service';
import {
  createLikeSchema,
  deleteLikeSchema,
} from '../utils/schemas/likereply.schema';

class LikeReplyController {
  async getLikes() {}

  async getLikesByReplyId(req: Request, res: Response, next: NextFunction) {
    try {
      const { replyId } = req.params;
      const likes = await likereplyService.getLikesByReplyId(replyId);
      res.json({
        message: 'Success get like reply data',
        data: likes,
      });
    } catch (error) {
      next(error);
    }
    return;
  }

  async getLikesByUserId(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      const likes = await likereplyService.getLikesByUserId(userId);
      res.json({
        message: 'Success get like by user id',
        data: likes,
      });
    } catch (error) {
      next(error);
    }
    return;
  }

  async getLike(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const like = await likereplyService.getLikeById(id);
      res.json({ message: 'Success get like', data: like });
    } catch (error) {
      next(error);
    }
    return;
  }

  async createLike(req: Request, res: Response, next: NextFunction) {
    /*  #swagger.requestBody = {
                  required: true,
                  content: {
                      "application/json": {
                          schema: {
                              $ref: "#/components/schemas/CreateLikeReplyDTO"
                          }  
                      }
                  }
              } 
          */
    try {
      const body = req.body;
      const userId = req.user.id;
      const { replyId } = await createLikeSchema.validateAsync(body);

      const like = await likereplyService.getLike(userId, replyId);
      if (like) {
        res.json({
          status: 406,
          message: "You can't like twice!",
        });
        return;
      }
      await likereplyService.createLike(userId, replyId);
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
      const { replyId } = await deleteLikeSchema.validateAsync(
        req.params.replyId
      );
      const userId = req.user.id;
      const like = await likereplyService.getLike(userId, replyId);
      if (!like) {
        res.status(404).json({
          message: 'Like not found!',
        });
        return;
      }
      await likereplyService.deleteLikeById(like.id);
      res.json({
        message: 'Unlike success!',
      });
    } catch (error) {
      next(error);
    }
    return;
  }
}

export default new LikeReplyController();
