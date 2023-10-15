import { Request, Response } from 'express'
import App from '../models/App'

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
