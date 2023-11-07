import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import './db'
import userRouter from './routes/user-router'
import appRouter from './routes/app-router'
import appLimitsRouter from './routes/app-limits-router'
import userAppsRouter from './routes/user-apps-router'

dotenv.config({ path: path.resolve(__dirname, './../.env') })

const app = express()

app.use(express.json())
app.use(cors())

app.use('/api/v1/users', userRouter)
app.use('/api/v1/apps', appRouter)
app.use('/api/v1/app-limits', appLimitsRouter)
app.use('/api/v1/user-apps', userAppsRouter)

export default app
