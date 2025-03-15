import { Router } from 'express';

import userRouter from './user.route';
import authRouter from './auth.route';
import threadRouter from './thread.route';
import likeRouter from './likes.route';
import profileRouter from './profile.route';
import replyRouter from './reply.route';
import followRouter from './follow.router';
import likeReplyRouter from './likereply.route';

const apiRouter = Router();

apiRouter.use('/users', userRouter);
apiRouter.use('/auth', authRouter);
apiRouter.use('/threads', threadRouter);
apiRouter.use('/likes', likeRouter);
apiRouter.use('/profiles', profileRouter);
apiRouter.use('/replies', replyRouter);
apiRouter.use('/follows', followRouter);
apiRouter.use('/likereplies', likeReplyRouter);

export default apiRouter;
