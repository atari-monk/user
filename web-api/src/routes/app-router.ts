import express from 'express'
import * as appController from '../controllers/app-controller'

const router = express.Router()

router.route('/').get(appController.getApps).post(appController.createApp)

router
  .route('/:id')
  .patch(appController.updateApp)
  .get(appController.getAppById)

export default router
