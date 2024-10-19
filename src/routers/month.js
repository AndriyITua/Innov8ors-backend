import { Router } from 'express';
import { getMonthWaterController } from '../controllers/water.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';

const monthRouter = Router();

monthRouter.get('/:year/:month', ctrlWrapper(getMonthWaterController));

export default monthRouter;
