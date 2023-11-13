import express from 'express'
import * as appLimitsController from '../controllers/app-limits-controller'

const router = express.Router()

router.route('/:appId').patch(appLimitsController.updateAppLimits)

router
  .route('/')
  .post(appLimitsController.createAppLimits)
  .get(appLimitsController.getAllAppLimits)

export default router
