import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

import authRoutes from './routes/auth'
import eventRoutes from './routes/events'
import taskRoutes from './routes/tasks'

dotenv.config()

const app = express()
const PORT = Number(process.env.PORT) || 5000

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
    console.log('Connected to MongoDB')
  } catch (error) {
    console.error('Database connection failed:', error)
    process.exit(1)
  }
}

const startServer = async () => {
  try {
    await connectDB()
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on port ${PORT}`)
    })
  } catch (error) {
    console.error('Failed to start server:', error)
    process.exit(1)
  }
}

startServer()
