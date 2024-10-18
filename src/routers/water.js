import { Router } from 'express';

import { updateWaterRateController } from '../controllers/water.js';

import ctrlWrapper from '../utils/ctrlWrapper.js';

const waterRouter = Router();

waterRouter.put('/water-rate', ctrlWrapper(updateWaterRateController));

export default waterRouter;
