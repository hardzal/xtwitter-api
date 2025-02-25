import { NextFunction, Request, Response } from 'express';
import userService from '../services/user.service';
import {
  createUserSchema,
  updateUserSchema,
} from '../utils/schemas/user.schema';

class UserController {
  async getUsers(req: Request, res: Response) {
    try {
      const users = await userService.getUsers();
      res.json(users);
    } catch (error) {
      res.json(error);
    }
    return;
  }

  async getUserById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await userService.getUserById(id);
      res.json(user);
    } catch (error) {
      res.json(error);
    }
    return;
  }

  async getUserSearch(req: Request, res: Response, next: NextFunction) {
    try {
      const q = req.query.q as string;

      if (!q.trim()) {
        res.json([]);
        return;
      }

      const users = await userService.getUserSearch(q);
      res.json(users);
    } catch (error) {
      next(error);
    }
  }

  async createUser(req: Request, res: Response) {
    try {
      const body = req.body;
      const validateBody = await createUserSchema.validateAsync(body);
      const user = await userService.createUser(validateBody);
      res.json(user);
    } catch (error) {
      res.json(error);
    }
    return;
  }

  async updateUserById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const body = req.body;

      const user = await userService.getUserById(id);

      if (!user) {
        res.status(404).json({
          messagE: 'user not found',
        });
        return;
      }

      const { email, username } = await updateUserSchema.validateAsync(body);

      if (email != '') {
        user.email = email;
      }

      if (username != '') {
        user.username = username;
      }
      const updateUser = await userService.updateUserById(id, user);
      res.json(updateUser);
    } catch (error) {
      res.json(error);
    }
    return;
  }

  async deleteUserById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const user = await userService.deleteUserById(id);
      res.json(user);
    } catch (error) {
      res.json(error);
    }
    return;
  }
}

export default new UserController();
