import mongoose from 'mongoose'
import { IUserApps } from './IUserApps'

const UserAppsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  appId: { type: mongoose.Schema.Types.ObjectId, ref: 'App' },
})

const UserApps = mongoose.model<IUserApps>('UserApps', UserAppsSchema)

export default UserApps
