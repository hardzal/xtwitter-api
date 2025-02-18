import { Router } from 'express';

import userRouter from './user.route';
import authRouter from './auth.route';

const apiRouter = Router();

apiRouter.use('/users', userRouter);
apiRouter.use('/auth', authRouter);

export default apiRouter;
