// types/express/index.d.ts
import { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        jwt: JwtPayload | string;
      };
    }
  }
}

export {};
