import express from 'express';
import dotenv from 'dotenv';
import rootRouter from './routes/root.route';
import apiRouter from './routes/api.route';
dotenv.config();

//
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(rootRouter);
app.use('/api', apiRouter);

app.listen(port, () => {
  console.log(`The server is running at http://localhost:${port}`);
});
