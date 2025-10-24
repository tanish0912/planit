import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

import authRoutes from './routes/auth'
import eventRoutes from './routes/events'
import taskRoutes from './routes/tasks'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/events', eventRoutes)
app.use('/api/tasks', taskRoutes)

app.get('/', (req, res) => {
  res.json({ message: 'PlanIt API' })
})

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/planit-app'
    await mongoose.connect(mongoURI)
  } catch (error) {
    process.exit(1)
  }
}

const startServer = async () => {
  await connectDB()
  app.listen(PORT, () => {
  })
}

startServer()
