import express from 'express'
import * as userAppsController from '../controllers/user-apps-controller'

const router = express.Router()

router.route('/').post(userAppsController.createUserApp)

router
  .route('/:userId/:appId')
  .get(userAppsController.getUserAppId)
  .delete(userAppsController.deleteUserApp)

export default router
