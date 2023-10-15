import { Document } from 'mongoose'

export interface IAppConfig extends Document {
  userId: string
  appId: string
  maxRecords: number
}
