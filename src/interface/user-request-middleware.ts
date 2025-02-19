import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';
export interface UserRequestMiddleware extends Request {
  user?: {
    id?: string;
    email?: string;
    jwt?: string | JwtPayload;
  };
}
