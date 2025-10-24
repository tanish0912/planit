import mongoose, { Document, Schema } from 'mongoose'

export interface IEvent extends Document {
  title: string
  description: string
  date: Date
  user: mongoose.Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

const eventSchema = new Schema<IEvent>({
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
  date: {
    type: Date,
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

export default mongoose.model<IEvent>('Event', eventSchema)
