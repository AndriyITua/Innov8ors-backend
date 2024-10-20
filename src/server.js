import express from 'express';
import cors from 'cors';

import { env } from './utils/env.js';

import logger from './middlewares/logger.js';
import errorHandler from './middlewares/errorHandler.js';
import notFoundHandler from './middlewares/notFoundHandler.js';
import cookieParser from 'cookie-parser';

import waterRouter from './routers/water.js';

import { authRouter } from './routers/auth.js';
import { userRouter } from './routers/user.js';

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
  app.use(cookieParser());

  app.use('/auth', authRouter);

  app.use('/water', waterRouter);

  app.use('/user', userRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
