import mongoose, { Schema, Model } from 'mongoose'
import { IAppConfig } from './IAppConfig'

const AppConfigSchema: Schema<IAppConfig> = new Schema<IAppConfig>({
  userId: { type: String, required: true },
  appId: { type: String, required: true },
  maxRecords: { type: Number, required: true },
})

const AppConfig: Model<IAppConfig> = mongoose.model<IAppConfig>(
  'AppConfig',
  AppConfigSchema
)

export default AppConfig
