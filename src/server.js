import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import logger from './middlewares/logger.js';
import notFoundHandler from './middlewares/notFoundHandler.js';
import errorHandler from './middlewares/errorHandler.js';
import swaggerDocs from './middlewares/swaggerDocs.js';
import handleUniqueError from './middlewares/handleUniqueError.js';
import authRouter from './routers/auth.js';
import waterRouter from './routers/water.js';
import userRouter from './routers/user.js';

import { env } from './utils/env.js';

const PORT = Number(env('PORT', '3000'));

export const startServer = () => {
  const app = express();

  const corsOptions = {
    origin: ['https://innov8ors-frontend.vercel.app', 'http://localhost:5173'],
    credentials: true,
    methods: '*',
  };

  app.use(cors(corsOptions));

  app.use(logger);

  app.use(
    express.json({
      type: ['application/json', 'application/vnd.api+json'],
      limit: '100kb',
    }),
  );
  app.use(cookieParser());
  app.use(express.static('uploads'));

  app.use('/auth', authRouter);
  app.use('/user', userRouter);
  app.use('/water', waterRouter);

  app.use('/api-docs', swaggerDocs());

  app.get('/', (req, res) => {
    res.json({
      message: 'Hello world!',
    });
  });

  app.use(handleUniqueError);
  app.use(notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
