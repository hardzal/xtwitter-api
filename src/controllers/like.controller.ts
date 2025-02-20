import likesService from '../services/likes.service';
import { Request, Response } from 'express';

class LikeController {
  async getLikes(req: Request, res: Response) {
    try {
      const likes = await likesService.getLikes();
      res.json(likes);
    } catch (error) {
      res.json(error);
    }
  }

  async getLikesByTheadId(req: Request, res: Response) {
    try {
      const { threadId } = req.params;
      const likes = await likesService.getLikesByThreadId(threadId);
      res.json(likes);
    } catch (error) {
      res.json(error);
    }
  }

  // user likes
  async getLikesByUserId(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const likes = await likesService.getLikesByUserId(userId);
      res.json(likes);
    } catch (error) {
      res.json(error);
    }
  }

  // get by id & parameter optional=threadId&userId
  async getLike(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const like = await likesService.getLikeById(id);
      res.json(like);
    } catch (error) {
      res.json(error);
    }
  }

  async createLike(req: Request, res: Response) {
    try {
      const body = req.body;
      const { userId, threadId } = body;

      const like = await likesService.getLike(userId, threadId);
      if (like) {
        res.json({
          status: 406,
          message: "You can't like twice!",
        });
        return;
      }
      const likeData = await likesService.createLike(body);
      res.json(likeData);
    } catch (error) {
      res.json(error);
    }
    return;
  }

  async deleteLike(req: Request, res: Response) {
    try {
      const { threadId, userId } = req.body;
      const like = await likesService.deleteLike(threadId, userId);
      res.json(like);
    } catch (error) {
      res.json(error);
    }
    return;
  }
}

export default new LikeController();
