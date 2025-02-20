import { Router } from 'express';

import userRouter from './user.route';
import authRouter from './auth.route';
import threadRouter from './thread.route';
import likeRouter from './likes.route';

const apiRouter = Router();

apiRouter.use('/users', userRouter);
apiRouter.use('/auth', authRouter);
apiRouter.use('/threads', threadRouter);
apiRouter.use('/likes', likeRouter);

export default apiRouter;
