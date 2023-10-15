import mongoose, { Schema, Model } from 'mongoose'
import { IApp } from './IApp'

const schema: Schema<IApp> = new Schema<IApp>({
  name: { type: String, required: true },
  desc: { type: String, required: true },
})

const App: Model<IApp> = mongoose.model<IApp>('App', schema)

export default App