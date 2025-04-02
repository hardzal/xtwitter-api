import { NextFunction, Request, Response } from 'express';

import replyService from '../services/reply.service';
import { createReplySchema } from '../utils/schemas/reply.schmea';
import likereplyService from '../services/likereply.service';

class ReplyController {
  async getReplies(req: Request, res: Response, next: NextFunction) {
    try {
      // res.json(replies);
      res.json();
    } catch (error) {
      next(error);
    }

    return;
  }

  async getReplyById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const reply = await replyService.getReplyById(id);

      if (!reply) {
        res.status(404).json({
          message: 'Thread is not found!',
        });
        return;
      }

      let isLiked = false;

      if (req.user) {
        const userId = req.user.id;
        const likereply = await likereplyService.getLike(userId, reply?.id);
        isLiked = likereply ? true : false;
      }

      const likesCount = reply?.likeReply.length;

      res.json({
        ...reply,
        likesCount,
        isLiked,
      });
    } catch (error) {
      next(error);
    }
    return;
  }

  async getRepliesByThreadId(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user.id;
      const threadId = req.params.threadId;
      const replies = await replyService.getRepliesByThreadId(threadId);
      console.log('user', userId);
      if (!replies) {
        res.status(404).json({
          message: 'Thread reply not found',
        });
        return;
      }
      const newReplies = await Promise.all(
        replies.map(async (reply) => {
          const likeReply = await likereplyService.getLike(userId, reply.id);
          const isLiked = likeReply ? true : false;
          const likesCount = reply.likeReply.length;

          return {
            ...reply,
            likesCount,
            isLiked,
          };
        })
      );

      res.json(newReplies);
    } catch (error) {
      next(error);
    }
  }

  async createReply(req: Request, res: Response, next: NextFunction) {
    /*  #swagger.requestBody = {
              required: true,
              content: {
                  "multipart/form-data": {
                      schema: {
                          $ref: "#/components/schemas/CreateReplyDTO"
                      }  
                  }
              }
          } 
      */

    try {
      const threadId = req.params.threadId;
      const body = req.body;

      const userId = req.user.id;
      const validatedBody = await createReplySchema.validateAsync(body);

      const reply = await replyService.createReply(
        userId,
        threadId,
        validatedBody
      );

      res.json({
        message: 'Reply created',
        data: { ...reply },
      });
    } catch (error) {
      next(error);
    }

    return;
  }

  async updateReplyById(req: Request, res: Response) {
    try {
      res.json();
    } catch (error) {
      res.json(error);
    }

    return;
  }

  async deleteReplyById(req: Request, res: Response) {
    try {
      res.json();
    } catch (error) {
      res.json(error);
    }

    return;
  }
}

export default new ReplyController();
