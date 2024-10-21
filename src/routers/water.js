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

import {
  waterRateSchema,
  waterConsumptionRecordSchema,
} from '../validation/water.js';

const waterRouter = Router();

waterRouter.use(authenticate);

waterRouter.put(
  '/water-rate',
  validateBody(waterRateSchema),
  ctrlWrapper(updateWaterRateController),
);
waterRouter.post(
  '/',
  validateBody(waterConsumptionRecordSchema),
  ctrlWrapper(addWaterConsumptionController),
);
waterRouter.patch(
  '/:id',
  isValidId,
  validateBody(waterConsumptionRecordSchema),
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
