import { Request, Response } from 'express'
import AppLimits from '../models/AppLimits'

export const createAppLimits = async (req: Request, res: Response) => {
  try {
    const { appId, limits } = req.body

    if (!appId || !limits || !Array.isArray(limits)) {
      return res.status(400).json({ error: 'Invalid request body' })
    }

    const existingAppLimits = await AppLimits.findOne({ appId })

    if (existingAppLimits) {
      return res
        .status(409)
        .json({ error: 'App limits already exist for this app' })
    }

    const appLimits = new AppLimits({ appId, limits })
    await appLimits.save()
    res.status(201).json(appLimits)
  } catch (error) {
    res.status(500).json({ error: 'Failed to create app limits' })
  }
}

export const getAppLimits = async (req: Request, res: Response) => {
  try {
    const { appId } = req.params // Assuming the appId is passed in the request parameters
    const appLimits = await AppLimits.findOne({ appId }, '-__v')

    if (!appLimits) {
      return res
        .status(404)
        .json({ error: 'App limits not found for the specified app' })
    }

    res.json(appLimits)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch app limits' })
  }
}

export const updateAppLimits = async (req: Request, res: Response) => {
  try {
    const { appId } = req.params
    const { limits } = req.body
    const appLimits = await AppLimits.findOne({ appId })

    if (!appLimits) {
      return res
        .status(404)
        .json({ error: 'App limits not found for the specified app' })
    }

    appLimits.limits = limits
    await appLimits.save()
    res.json(appLimits)
  } catch (error) {
    res.status(500).json({ error: 'Failed to update app limits' })
  }
}
