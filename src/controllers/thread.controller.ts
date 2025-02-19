import { Request, Response } from 'express';
import { v2 as cloudinary } from 'cloudinary';
import threadService from '../services/thread.service';
import { createThreadSchema } from '../utils/schemas/thread.schema';

class ThreadController {
  // get all Thread
  async getThreads(req: Request, res: Response) {
    try {
      const threads = await threadService.getThreads();
      res.json(threads);
    } catch (error) {
      res.json(error);
    }
    return;
  }

  // get one thread by Id
  async getThreadById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const thread = await threadService.getThreadById(id);
      res.json(thread);
    } catch (error) {
      res.json(error);
    }
    return;
  }

  async getThreadByUserId(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const thread = await threadService.getThreadByUserId(userId);
      res.json(thread);
    } catch (error) {
      res.json(error);
    }
    return;
  }

  // create thread
  async createThread(req: Request, res: Response) {
    try {
      const uploadResult = await cloudinary.uploader.upload(
        req.file?.path || ''
      );

      const body = {
        ...req.body,
        images: uploadResult.secure_url,
      };

      const userId = req.user.id;
      const validatedBody = await createThreadSchema.validateAsync(body);
      const thread = threadService.createThread(userId, validatedBody);
      res.json(thread);
    } catch (error) {
      res.json(error);
    }
    return;
  }

  // update thread:
  async updateThread(req: Request, res: Response) {
    try {
      let body;
      if (req.file !== null) {
        const uploadResult = await cloudinary.uploader.upload(
          req.file?.path || ''
        );

        body = {
          ...req.body,
          images: uploadResult.secure_url,
        };
      } else {
        body = req.body;
      }

      const userId = req.user.id;
      const validatedBody = await createThreadSchema.validateAsync(body);
      const thread = threadService.createThread(userId, validatedBody);
      res.json(thread);
    } catch (error) {
      res.json(error);
    }
  }

  // delete thread
  async deleteThread(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const thread = await threadService.deleteThread(id);
      res.json(thread);
    } catch (error) {
      res.json(error);
    }
  }
}

export default new ThreadController();
