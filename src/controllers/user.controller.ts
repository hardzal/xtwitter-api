import { NextFunction, Request, Response } from 'express';
import userService from '../services/user.service';
import {
  createUserSchema,
  updateUserSchema,
} from '../utils/schemas/user.schema';
import followService from '../services/follow.service';

class UserController {
  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userService.getUsers();
      res.json({
        message: 'succesfully get all users',
        data: users,
      });
    } catch (error) {
      next(error);
    }
    return;
  }

  async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const user = await userService.getUserById(id);
      res.json({
        message: 'succesfully get user data',
        data: user,
      });
    } catch (error) {
      next(error);
    }
    return;
  }

  async getUserByUsername(req: Request, res: Response, next: NextFunction) {
    try {
      const { username } = req.params;
      const user = await userService.getUserByUsername(username);

      res.json({
        message: 'succesfully get user data',
        data: user,
      });
    } catch (error) {
      next(error);
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
      const userId = req.user.id;

      const users = await userService.getUserSearch(q);

      const newSearch = [];
      for (const user of users) {
        // mencari tahu apakah user login memnfollow user ini
        const follow = await followService.getFollowsDetails(user.id, userId);

        const isFollowing = follow ? true : false;

        newSearch.push({
          ...user,
          isFollowing,
        });
      }

      if (users.length > 0) {
        res.status(200).json({
          message: 'get all data search users!',
          data: newSearch,
        });
      } else {
        res.status(404).json({
          message: 'Not found',
        });
      }
      // console.log(newSearch);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async createUser(req: Request, res: Response, next: NextFunction) {
    /*  #swagger.requestBody = {
            required: true,
            content: {
              "multipart/form-data": {
                    schema: {
                        $ref: "#/components/schemas/CreateUserDTO"
                    }  
                }
            }
        } 
    */
    try {
      const body = req.body;
      const validateBody = await createUserSchema.validateAsync(body);
      const user = await userService.createUser(validateBody);
      res.json(user);
    } catch (error) {
      next(error);
    }
    return;
  }

  async updateUserById(req: Request, res: Response, next: NextFunction) {
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
      next(error);
    }
    return;
  }

  async deleteUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const user = await userService.deleteUserById(id);
      res.json(user);
    } catch (error) {
      next(error);
    }
    return;
  }
}

export default new UserController();
