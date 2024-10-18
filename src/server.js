import express from 'express';
import cors from 'cors';

import { env } from './utils/env.js';

import logger from './middlewares/logger.js';
import errorHandler from './middlewares/errorHandler.js';
import notFoundHandler from './middlewares/notFoundHandler.js';

import waterRouter from './routers/water.js';

import { authRouetr } from './routers/auth.js';

const PORT = Number(env('PORT', '3000'));

export const startServer = () => {
  const app = express();

  app.use(logger);
  app.use(cors());
  app.use(
    express.json({
      type: ['application/json', 'application/vnd.api+json'],
      limit: '100kb',
    }),
  );


  app.use('/auth', authRouetr);


  app.use('/water', waterRouter);

  app.get('/', (req, res) => {
    res.json({
      message: 'Hello World!',
    });
  });

  app.use(notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
