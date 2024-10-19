import { Router } from 'express';
import { getTodayWaterController } from '../controllers/water.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';

const todayRouter = Router();

todayRouter.get('/', ctrlWrapper(getTodayWaterController));

export default todayRouter;
