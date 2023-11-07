import { Request, Response } from 'express'
import UserApps from '../models/UserApps'

export const createUserApp = async (req: Request, res: Response) => {
  try {
    const { userId, appId } = req.body
    const existingUserApp = await UserApps.findOne({ userId, appId })

    if (existingUserApp) {
      return res
        .status(409)
        .json({ error: 'User-App relationship already exists' })
    }

    const userApp = new UserApps({ userId, appId })
    await userApp.save()
    res.status(201).json(userApp)
  } catch (error) {
    res.status(500).json({ error: 'Failed to create User-App relationship' })
  }
}

export const getUserApps = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params // Assuming the userId is passed in the request parameters
    const userApps = await UserApps.find({ userId }, '-__v')

    if (!userApps || userApps.length === 0) {
      return res
        .status(404)
        .json({ error: 'No apps found for the specified user' })
    }

    res.json(userApps)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user apps' })
  }
}

export const getUserAppId = async (req: Request, res: Response) => {
  try {
    const { userId, appId } = req.params // Assuming userId and appId are passed in the request parameters
    const userApp = await UserApps.findOne({ userId, appId }, '_id')

    if (!userApp) {
      return res.status(404).json({ error: 'User-App relationship not found' })
    }

    res.json({ userAppId: userApp._id })
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch User-App relationship ID' })
  }
}

export const deleteUserApp = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const userApp = await UserApps.findByIdAndDelete(id)

    if (!userApp) {
      return res.status(404).json({ error: 'User-App relationship not found' })
    }

    res.json({ message: 'User-App relationship deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete User-App relationship' })
  }
}
