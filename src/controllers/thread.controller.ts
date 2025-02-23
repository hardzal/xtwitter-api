import { NextFunction, Request, Response } from 'express';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import threadService from '../services/thread.service';
import { createThreadSchema } from '../utils/schemas/thread.schema';
import likesService from '../services/likes.service';
import fs from 'fs';

class ThreadController {
  // get all Thread
  async getThreads(req: Request, res: Response, next: NextFunction) {
    try {
      // login UserId
      const userId = req?.user?.id;
      const threads = await threadService.getThreads();

      const newThreads = await Promise.all(
        threads.map(async (thread) => {
          const like = await likesService.getLike(userId, thread.id);
          const isLiked = like ? true : false;
          const likesCount = thread.likes.length;

          return {
            ...thread,
            likesCount,
            isLiked,
          };
        })
      );

      res.json(newThreads);
    } catch (error) {
      next(error);
    }
    return;
  }

  // get one thread by Id
  async getThreadById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const thread = await threadService.getThreadById(id);
      res.json(thread);
    } catch (error) {
      next(error);
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
  async createThread(req: Request, res: Response, next: NextFunction) {
    /*  #swagger.requestBody = {
            required: true,
            content: {
              "multipart/form-data": {
                    schema: {
                        $ref: "#/components/schemas/CreateThreadDTO"
                    }  
                }
            }
        } 
    */
    try {
      let uploadResult: UploadApiResponse = {} as UploadApiResponse;

      if (req.file) {
        uploadResult = await cloudinary.uploader.upload(req.file?.path || '');
        fs.unlinkSync(req.file.path);
      }

      const body = {
        ...req.body,
        images: uploadResult.secure_url ?? undefined,
      };

      const userId = req.user.id;
      const validatedBody = await createThreadSchema.validateAsync(body);
      const thread = threadService.createThread(userId, validatedBody);
      res.json({
        message: 'Thread created!',
        data: { ...thread },
      });
    } catch (error) {
      next(error);
    }
    return;
  }

  // update thread:
  async updateThread(req: Request, res: Response, next: NextFunction) {
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
      next(error);
    }
  }

  // delete thread
  async deleteThread(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const thread = await threadService.deleteThread(id);
      res.json(thread);
    } catch (error) {
      next(error);
    }
  }
}

export default new ThreadController();
