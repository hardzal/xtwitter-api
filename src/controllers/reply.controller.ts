import { NextFunction, Request, Response } from 'express';
import { prisma } from '../libs/prisma';
import replyService from '../services/reply.service';
import { createReplySchema } from '../utils/schemas/reply.schmea';

class ReplyController {
  async getReplies(req: Request, res: Response, next: NextFunction) {
    try {
      const replies = await prisma.reply.findMany();
      res.json(replies);
    } catch (error) {
      next(error);
    }

    return;
  }

  async getReplyById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const reply = await prisma.reply.findFirst({
        where: { id },
        include: {
          thread: true,
          user: true,
        },
      });
      res.json(reply);
    } catch (error) {
      next(error);
    }
    return;
  }

  async getRepliesByThreadId(req: Request, res: Response, next: NextFunction) {
    try {
      const threadId = req.params.threadId;
      const replies = await replyService.getRepliesByThreadId(threadId);

      res.json(replies);
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
