import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export async function authCheck(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const token = req.headers['authorization'] || '';
  const jwtSecret = process.env.JWT_SECRET || '';
  const user = jwt.verify(token, jwtSecret);

  if (!user) {
    res.status(401).json({
      message: 'Unauthorized',
    });
    return;
  }

  req.user!.jwt = user;
  next();
}
