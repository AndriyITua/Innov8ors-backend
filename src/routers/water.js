import { Router } from 'express';

import {
  addWaterConsumptionController,
  updateWaterRateController,
  updateWaterConsumptionController,
  deleteWaterConsumptionController,
} from '../controllers/water.js';

import validateBody from '../utils/validateBody.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';

import { waterAddSchema, waterUpdateSchema } from '../validation/water.js';

const waterRouter = Router();

waterRouter.put('/water-rate', ctrlWrapper(updateWaterRateController));
waterRouter.post(
  '/',
  validateBody(waterAddSchema),
  ctrlWrapper(addWaterConsumptionController),
);
waterRouter.put(
  '/:id',
  validateBody(waterUpdateSchema),
  ctrlWrapper(updateWaterConsumptionController),
);
waterRouter.delete('/:id', ctrlWrapper(deleteWaterConsumptionController));

export default waterRouter;
