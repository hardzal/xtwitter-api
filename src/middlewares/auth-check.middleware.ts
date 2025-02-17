import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserRequestMiddleware } from '../interface/user-request-middleware';

export function authCheck(
  req: UserRequestMiddleware,
  res: Response,
  next: NextFunction
) {
  const token = req.headers['authorization'] || '';
  const jwtSecret = process.env.JWT_SECRET || '';
  const user = jwt.verify(token, jwtSecret);

  if (!user) {
    res.status(401).json({
      message: 'Unauthorized',
    });
    return;
  }

  req.user.jwt = user;
  next();
}
