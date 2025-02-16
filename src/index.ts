import express from 'express';
import dotenv from 'dotenv';

import rootRouter from './routes/root.route';
import userRouter from './routes/user.route';

dotenv.config();

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

app.use(rootRouter);
app.use('/users', userRouter);

app.listen(port, () => {
  console.log(`The server is running at http://localhost:${port}`);
});
