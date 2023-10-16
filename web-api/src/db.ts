import mongoose, { ConnectOptions } from 'mongoose'
import dotenv from 'dotenv'
import path from 'path'
import { utils } from './utils'

const configPath = path.resolve(__dirname, './../.env')
dotenv.config({ path: configPath })

const debug = false
if (debug)
  utils.printMatchingEnvVariableNames([
    'CUSTOMCONNSTR_DATABASE',
    'CUSTOMCONNSTR_DATABASE_PASSWORD',
  ])

function getAtlasConnectionString() {
  const cs = process.env.CUSTOMCONNSTR_DATABASE
  const pw = process.env.CUSTOMCONNSTR_DATABASE_PASSWORD
  if (!cs || !pw) throw new Error('Database connection string not set!')
  const dbConnectionString = cs.replace('<password>', pw)
  return dbConnectionString
}

function getLocalConnectionString() {
  const cs = process.env.DATABASE_LOCAL
  if (!cs) throw new Error('Database connection string not set!')
  return cs
}

const atlas = true
const dbConnectionString = atlas
  ? getAtlasConnectionString()
  : getLocalConnectionString()

mongoose.connect(dbConnectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as ConnectOptions)
