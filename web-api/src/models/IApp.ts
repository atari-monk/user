import { Document } from 'mongoose'

export interface IApp extends Document {
  name: string
  desc: string
}
