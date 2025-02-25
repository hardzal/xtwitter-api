import { Prisma } from '@prisma/client';
import { Response, Request, NextFunction } from 'express';
import Joi from 'joi';
/* eslint-disable */
export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  /* eslint-enable */
  if (err instanceof Joi.ValidationError) {
    res.status(400).json({
      message: err.details[0].message,
    });
    return;
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    res.status(400).json({
      message: err.message,
    });
    return;
  }

  res
    .status(500)
    .json({ message: `Internal server error: Error ${JSON.stringify(err)}` });
}
