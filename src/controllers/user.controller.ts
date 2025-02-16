import { Request, Response } from 'express';
import userService from '../services/user.service';
import {
  createUserSchema,
  updateUserSchema,
} from '../utils/schemas/user.schema';

class UserController {
  async getUsers(req: Request, res: Response) {
    try {
      const users = await userService.getUsers();
      return res.json(users);
    } catch (error) {
      return res.json(error);
    }
  }

  async getUserById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await userService.getUserById(id);
      return res.json(user);
    } catch (error) {
      return res.json(error);
    }
  }

  async createUser(req: Request, res: Response) {
    try {
      const body = req.body;
      const validateBody = await createUserSchema.validateAsync(body);
      const user = await userService.createUser(validateBody);
      return res.json(user);
    } catch (error) {
      return res.json(error);
    }
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
  }

  async deleteUserById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const user = await userService.deleteUserById(id);
      res.json(user);
    } catch (error) {
      res.json(error);
    }
  }
}

export default new UserController();
