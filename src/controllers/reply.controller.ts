import { Request, Response } from 'express';
import { prisma } from '../libs/prisma';

class ReplyController {
  async getReplies(req: Request, res: Response) {
    try {
      const replies = await prisma.reply.findMany();
      res.json(replies);
    } catch (error) {
      res.json(error);
    }

    return;
  }

  async getReplyById(req: Request, res: Response) {
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
      res.json(error);
    }
    return;
  }

  async createReply(req: Request, res: Response) {
    try {
      res.json();
    } catch (error) {
      res.json(error);
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
