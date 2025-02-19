import express from 'express';
import dotenv from 'dotenv';
import rootRouter from './routes/root.route';
import apiRouter from './routes/api.route';
import swaggerUI from 'swagger-ui-express';
import swaggerDoc from '../swagger/swagger-output.json';

dotenv.config();
//
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
// npm run swagger to generate new api points
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));

app.use(rootRouter);
app.use('/api', apiRouter);

app.listen(port, () => {
  console.log(`The server is running at http://localhost:${port}`);
});
