import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
dotenv.config();

export async function authCheck(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  /* #swagger.security = [{
            "bearerAuth": []
    }] */
  let token = req.headers['authorization'] || '';
  if (token.split(' ').length > 1) {
    token = token.split(' ')[1];
  }
  console.log('ini tokennya: ', token);

  const jwtSecret = process.env.JWT_SECRET || '';
  const user = jwt.verify(token, jwtSecret);

  if (!user) {
    res.status(401).json({
      message: 'Unauthorized',
    });
    return;
  }

  // (req as any).user = user;
  console.log(user);
  req.user = user;
  next();
}
