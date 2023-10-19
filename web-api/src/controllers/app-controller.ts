import { Request, Response } from 'express'
import App from '../models/App'

export const getApps = async (req: Request, res: Response) => {
  try {
    const apps = await App.find({}, '-__v')
    res.json(apps)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch apps' })
  }
}

export const createApp = async (req: Request, res: Response) => {
  try {
    const { name, desc } = req.body
    const existingApp = await App.findOne({ name })
    if (existingApp) {
      return res.status(409).json({ error: 'App already exists' })
    }
    const app = new App({ name, desc })
    await app.save()
    res.status(201).json(app)
  } catch (error) {
    res.status(500).json({ error: 'Failed to create app' })
  }
}

export const updateApp = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { name, desc } = req.body
    const app = await App.findById(id)

    if (!app) {
      return res.status(404).json({ error: 'App not found' })
    }

    if (name) {
      app.name = name
    }

    if (desc) {
      app.desc = desc
    }

    await app.save()
    res.json(app)
  } catch (error) {
    res.status(500).json({ error: 'Failed to update app' })
  }
}

export const getAppById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params // Get the app ID from the request parameters
    const app = await App.findById(id, '-__v') // Find the app by ID and exclude the '__v' field

    if (!app) {
      return res.status(404).json({ error: 'App not found' })
    }

    res.json(app)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch app by ID' })
  }
}