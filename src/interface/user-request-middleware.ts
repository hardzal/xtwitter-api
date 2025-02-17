import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';
export interface UserRequestMiddleware extends Request {
  user: User;
}

interface User {
  id: string;
  email: string;
  jwt: JwtPayload | string;
}
