// types/express/index.d.ts
/* eslint-disable @typescript-eslint/no-explicit-any */

declare global {
  namespace Express {
    interface Request {
      [key: string]: any;
    }
  }
}

export {};
