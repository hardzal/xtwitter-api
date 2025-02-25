import { NextFunction, Request, Response } from 'express';
import userService from '../services/user.service';
import authService from '../services/auth.service';

import {
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
  ResetPasswordSchema,
} from '../utils/schemas/auth.schema';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { transportNodeMailer } from '../config/nodemailer-transporter';
import { RegisterDTO } from '../dtos/auth.dto';

class AuthController {
  async login(req: Request, res: Response, next: NextFunction) {
    /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/LoginDTO"
                    }  
                }
            }
        } 
    */
    try {
      const body = req.body;
      const { email, password } = await loginSchema.validateAsync(body);

      if (!email) {
        res.status(404).json({ message: 'Email/password is wrong!' });
        return;
      }

      const user = await userService.getUserByEmail(email);

      if (user === null) {
        res.status(404).json({ message: 'User not found!' });
        return;
      }

      const isPasswordMatch = await bcrypt.compare(password, user.password);

      if (!isPasswordMatch) {
        res.status(404).json({
          message: 'Email / password is wrong!',
        });
        return;
      }

      const jwtSecret = process.env.JWT_SECRET || '';
      const token = jwt.sign(
        {
          id: user?.id,
        },
        jwtSecret,
        {
          expiresIn: '1 days',
        }
      );
      const { ...userResponse } = user;

      res.json({
        message: 'Login success',
        data: {
          user: userResponse,
          token,
        },
      });
    } catch (error) {
      next(error);
    }
    return;
  }

  async register(req: Request, res: Response, next: NextFunction) {
    /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/RegisterDTO"
                    }  
                }
            }
        } 
    */
    try {
      const body = req.body;
      const validatedBody = await registerSchema.validateAsync(body);
      const hashedPassword = await bcrypt.hash(validatedBody.password, 10);

      const registerBody: RegisterDTO = {
        ...validatedBody,
        password: hashedPassword,
      };

      const user = await authService.register(registerBody);
      res.status(200).json({
        message: 'Register success!',
        data: { ...user },
      });
    } catch (error) {
      next(error);
    }
    return;
  }

  async check(req: Request, res: Response, next: NextFunction) {
    try {
      // const payload = (req as any).user; // fixed by defined an interface
      const payload = req.user; // fixed by defined an interface
      const user = await userService.getUserById(payload!.id, false);

      if (!user) {
        res.status(404).json({
          message: 'User not found!',
        });
        return;
      }

      res.status(200).json({
        message: 'User check success!',
        data: user,
      });
    } catch (error) {
      next(error);
    }
    return;
  }

  async forgotPassword(req: Request, res: Response, next: NextFunction) {
    /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/ForgotPasswordDTO"
                    }  
                }
            }
        } 
    */
    try {
      const body = req.body;
      const { email } = await forgotPasswordSchema.validateAsync(body);

      const jwtSecret = process.env.JWT_SECRET || '';

      const token = jwt.sign({ email }, jwtSecret, {
        expiresIn: '1 days',
      });

      const frontEndUrl = process.env.FRONTEND_BASE_URL || '';
      const resetPasswordLink = `${frontEndUrl}/reset-password?token=${token}`;

      const emailOptions = {
        from: 'rizaldoeta98@gmail.com',
        to: email,
        subject: 'Circle | forgot Password',
        html: `
        <h1>This is link for reset Password:<h1><br/>
        <a href="${resetPasswordLink}">${resetPasswordLink}</a>
      `,
      };

      await transportNodeMailer.sendMail(emailOptions);
      res.json({
        message: 'Forgot password link sent!',
      });
    } catch (error) {
      next(error);
    }
    return;
  }

  async resetPassword(req: Request, res: Response, next: NextFunction) {
    /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/ResetPasswordDTO"
                    }  
                }
            }
        } 
    */
    try {
      // const payload = (req as any).user; // shorterm
      const payload = req.user; // shorterm
      const body = req.body;

      const { oldPassword, newPassword } =
        await ResetPasswordSchema.validateAsync(body);

      if (oldPassword === newPassword) {
        res.status(400).json({
          message: 'Password cannot be the same as previous!',
        });
        return;
      }
      console.log(payload);
      const user = await userService.getUserByEmail(payload!.email);

      if (!user) {
        res.status(404).json({
          message: 'User not found!',
        });
        return;
      }

      const isOldPasswordCorrent = await bcrypt.compare(
        oldPassword,
        user.password
      );

      if (!isOldPasswordCorrent) {
        res.status(400).json({
          message: 'Old Password is not correct',
        });
        return;
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      const updatedUserPassword = await authService.resetPassword(
        user.email,
        hashedPassword
      );
      res.json(updatedUserPassword);
    } catch (error) {
      next(error);
    }
    return;
  }

  async verifyEmail(req: Request, res: Response) {
    try {
      // user mendaftar
      // sistem mengirim link konfirmasi email
      // user mengakses link konfirmasi email
      // user terkonfirmasi emailnya

      res.json();
    } catch (error) {
      res.json(error);
    }
    return;
  }
}

export default new AuthController();
