import mongoose, { Schema, Model } from 'mongoose'
import { IApp } from './IApp'

const AppSchema: Schema<IApp> = new Schema<IApp>({
  name: { type: String, required: true },
  desc: { type: String, required: true },
})

const App: Model<IApp> = mongoose.model<IApp>('App', AppSchema)

export default App
