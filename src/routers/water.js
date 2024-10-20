import { Router } from 'express';

import { authenticate } from '../middlewares/authenticate.js';
import { isValidId } from '../middlewares/isValidId.js';
import { validateDateParams } from '../validation/dateParams.js';

import {
  addWaterConsumptionController,
  updateWaterRateController,
  updateWaterConsumptionController,
  deleteWaterConsumptionController,
  getTodayWaterController,
  getMonthWaterController,
} from '../controllers/water.js';

import validateBody from '../utils/validateBody.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';

import { waterAddSchema, waterUpdateSchema } from '../validation/water.js';

const waterRouter = Router();

waterRouter.use(authenticate);

waterRouter.put('/water-rate', ctrlWrapper(updateWaterRateController));
waterRouter.post(
  '/',
  validateBody(waterAddSchema),
  ctrlWrapper(addWaterConsumptionController),
);
waterRouter.put(
  '/:id',
  isValidId,
  validateBody(waterUpdateSchema),
  ctrlWrapper(updateWaterConsumptionController),
);
waterRouter.delete(
  '/:id',
  isValidId,
  ctrlWrapper(deleteWaterConsumptionController),
);

waterRouter.get('/today', ctrlWrapper(getTodayWaterController));

waterRouter.get(
  '/:year/:month',
  validateDateParams,
  ctrlWrapper(getMonthWaterController),
);

export default waterRouter;
