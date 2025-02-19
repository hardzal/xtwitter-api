import { Router } from 'express';

import userRouter from './user.route';
import authRouter from './auth.route';
import threadController from '../controllers/thread.controller';

const apiRouter = Router();

apiRouter.use('/users', userRouter);
apiRouter.use('/auth', authRouter);
apiRouter.use('/threads', threadController);

export default apiRouter;
