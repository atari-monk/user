import express from 'express'
import * as userAppsController from '../controllers/user-apps-controller'

const router = express.Router()

router.route('/getUserApps/:userId').get(userAppsController.getUserApps)

router
  .route('/:userId/:appId')
  .get(userAppsController.getUserAppId)
  .delete(userAppsController.deleteUserApp)

router
  .route('/')
  .post(userAppsController.createUserApp)
  .get(userAppsController.getAllUserApps)

export default router
