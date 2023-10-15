import express from 'express'
import * as appController from '../controllers/app-controller'

const router = express.Router()

router.route('/').post(appController.createApp)

export default router
