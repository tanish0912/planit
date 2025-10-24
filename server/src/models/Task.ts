import mongoose, { Document, Schema } from 'mongoose'

export interface ITask extends Document {
  title: string
  description: string
  status: 'pending' | 'completed'
  event: mongoose.Types.ObjectId
  user: mongoose.Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

const taskSchema = new Schema<ITask>({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'completed'],
    default: 'pending'
  },
  event: {
    type: Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

export default mongoose.model<ITask>('Task', taskSchema)
