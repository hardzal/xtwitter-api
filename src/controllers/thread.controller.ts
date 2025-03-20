import { NextFunction, Request, Response } from 'express';
import { v2 as cloudinary } from 'cloudinary';
import threadService from '../services/thread.service';
import {
  createThreadSchema,
  deleteThreadSchema,
  updateThreadSchema,
} from '../utils/schemas/thread.schema';
import likesService from '../services/like.service';
import { uploadImageSingle } from '../utils/upload';

class ThreadController {
  // get all Thread
  async getThreads(req: Request, res: Response, next: NextFunction) {
    try {
      // login UserId
      const userId = req?.user?.id;

      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const startIndex = (page - 1) * limit;

      const pagination = {
        page,
        limit,
        startIndex,
      };

      const threads = await threadService.getThreads(pagination);

      const newThreads = await Promise.all(
        threads.map(async (thread) => {
          const like = await likesService.getLike(userId, thread.id);
          const isLiked = like ? true : false;
          const likesCount = thread.likes.length;
          const repliesCount = thread.replies.length;

          return {
            ...thread,
            likesCount,
            repliesCount,
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

      if (!thread) {
        res.status(404).json({
          message: 'Thread is not found!',
        });
        return;
      }
      let isLiked = false;

      if (req.user) {
        const userId = req.user.id;
        const like = await likesService.getLike(userId, thread.id);
        isLiked = like ? true : false;
      }

      const likesCount = thread?.likes.length;
      const repliesCount = thread?.replies.length;

      res.json({
        ...thread,
        likesCount,
        repliesCount,
        isLiked,
      });
    } catch (error) {
      console.log('error here');
      console.log(error);
      next(error);
    }
    return;
  }

  async getThreadByUserId(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;

      const threads = await threadService.getThreadByUserId(userId);

      if (!threads) {
        res.status(404).json({
          message: 'Thread is not found!',
        });
        return;
      }
      const newThreads = await Promise.all(
        threads.map(async (thread) => {
          const like = await likesService.getLike(userId, thread.id);
          const isLiked = like ? true : false;
          const likesCount = thread.likes.length;
          const repliesCount = thread.replies.length;

          return {
            ...thread,
            likesCount,
            repliesCount,
            isLiked,
          };
        })
      );

      res.json(newThreads);
    } catch (error) {
      console.log('error here');
      console.log(error);
      next(error);
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
      let imageUrl: string = '';
      if (req.file) {
        imageUrl = await uploadImageSingle('dumbways/threads', req);
      }
      const body = {
        ...req.body,
        images: imageUrl || undefined,
      };

      const userId = req.user.id;
      const validatedBody = await createThreadSchema.validateAsync(body);
      const thread = await threadService.createThread(userId, validatedBody);

      console.log(thread);
      if (thread) {
        res.status(201).json({
          message: 'Thread created!',
          data: { ...thread },
        });
      } else {
        res.status(500).json({
          message: 'Thread failed to created!',
        });
      }
    } catch (error) {
      console.log('error coy');
      console.log(error);
      next(error);
    }
    return;
  }

  // update thread:
  async updateThread(req: Request, res: Response, next: NextFunction) {
    /*  #swagger.requestBody = {
            required: true,
            content: {
              "multipart/form-data": {
                    schema: {
                        $ref: "#/components/schemas/UpdateThreadDTO"
                    }  
                }
            }
        } 
    // */

    try {
      let body: object = {};
      let imageUrl: string = '';
      const id = req.params.id;
      console.log(body);
      const data = await threadService.getThreadById(id);
      const oldImages: string = data?.images as string;

      console.log('oldImages', oldImages);

      if (req.file) {
        imageUrl = await uploadImageSingle('dumbways/threads', req);

        if (data?.images) {
          const images = data?.images
            .split('/')
            .splice(7, 4)
            .join('/')
            .split('.')[0];
          cloudinary.uploader.destroy(images, function (result) {
            console.log('Succesfuly deleted image!', result);
          });
        }

        body = {
          ...req.body,
          images: imageUrl || undefined,
        };
      } else {
        body = req.body;
      }
      const validatedBody = await updateThreadSchema.validateAsync(body);

      if (!validatedBody.images) {
        validatedBody.images = oldImages;
      }

      const thread = await threadService.updateThread(id, validatedBody);

      res
        .status(202)
        .json({ message: 'Succesfully updated the thread!', ...thread });
    } catch (error) {
      next(error);
    }
  }

  // delete thread
  async deleteThread(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = await deleteThreadSchema.validateAsync(req.params);
      const data = await threadService.getThreadById(id);

      if (data?.images) {
        const images = data?.images
          .split('/')
          .splice(7, 4)
          .join('/')
          .split('.')[0];
        cloudinary.uploader.destroy(images, function (result) {
          console.log('Succesfuly deleted image!', result);
        });
      }

      const thread = await threadService.deleteThread(id);
      res
        .status(202)
        .json({ message: 'Succesfully deleted the thread!', data: thread });
    } catch (error) {
      next(error);
    }
  }
}

export default new ThreadController();
