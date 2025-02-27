import express from 'express';
import dotenv from 'dotenv';
import rootRouter from './routes/root.route';
import apiRouter from './routes/api.route';
import swaggerUI from 'swagger-ui-express';
import swaggerDoc from '../swagger/swagger-output.json';
import cors from 'cors';
import { errorHandler } from './middlewares/error.middleware';

dotenv.config();
//
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
// npm run swagger to generate new api points

app.use(
  cors({
    origin: ['http://localhost:5173'],
  })
);
app.use(express.json());
app.use(
  '/docs',
  swaggerUI.serve,
  swaggerUI.setup(swaggerDoc, {
    customSiteTitle: 'Circle App API',
    customfavIcon: 'NONE',
    isExplorer: true,
    customJs:
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
    customCssUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
    customCss: `
              .swagger-ui .topbar { display: none } 
              .information-container.wrapper { background:rgb(5 84 109); padding: 2rem } 
              .information-container .info { margin: 0 } 
              .information-container .info .main { margin: 0 !important} 
              .information-container .info .main .title { color:rgb(0, 0, 0)} 
              .renderedMarkdown p { margin: 0 !important; color:rgb(0, 0, 0) !important }
              `,
    swaggerOptions: {
      persistAuthorization: true,
    },
  })
);
app.use(rootRouter);
app.use('/api', apiRouter);
app.use(errorHandler);
app.listen(port, () => {
  console.log(`The server is running at http://localhost:${port}`);
});
