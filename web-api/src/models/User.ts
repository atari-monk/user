import mongoose, { Schema, Model } from 'mongoose'
import { IUser } from './IUser'
import validator from 'validator'

const UserSchema: Schema<IUser> = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: 'Invalid email format',
    },
  },
  displayName: { type: String, required: true },
})

const User: Model<IUser> = mongoose.model<IUser>('User', UserSchema)

export default User
