import { Router } from 'express';

import userRouter from './user.route';
import authRouter from './auth.route';
import threadRouter from './thread.route';

const apiRouter = Router();

apiRouter.use('/users', userRouter);
apiRouter.use('/auth', authRouter);
apiRouter.use('/threads', threadRouter);

export default apiRouter;
