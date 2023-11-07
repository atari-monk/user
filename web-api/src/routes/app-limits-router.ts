import express from 'express'
import * as appLimitsController from '../controllers/app-limits-controller'

const router = express.Router()

router.route('/').post(appLimitsController.createAppLimits)

router
  .route('/:appId')
  .get(appLimitsController.getAppLimits)
  .patch(appLimitsController.updateAppLimits)

export default router
