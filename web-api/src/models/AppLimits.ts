import mongoose from 'mongoose'
import { IAppLimits } from './IAppLimits'

const AppLimitsSchema = new mongoose.Schema({
  appId: { type: mongoose.Schema.Types.ObjectId, ref: 'App' },
  limits: [
    {
      modelName: String,
      maxRecordsNr: Number,
    },
  ],
})

const AppLimits = mongoose.model<IAppLimits>('AppLimits', AppLimitsSchema)

export default AppLimits
