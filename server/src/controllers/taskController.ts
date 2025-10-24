import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import Task from '../models/Task'

export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find({ user: req.userId }).populate('event').sort({ createdAt: -1 })
    res.json(tasks)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}

export const createTask = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { title, description, eventId, status } = req.body

    const task = new Task({
      title,
      description,
      event: eventId,
      status: status || 'pending',
      user: req.userId
    })

    await task.save()
    await task.populate('event')
    res.status(201).json(task)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}

export const updateTask = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { id } = req.params
    const { title, description, eventId, status } = req.body

    const task = await Task.findOneAndUpdate(
      { _id: id, user: req.userId },
      { title, description, event: eventId, status },
      { new: true }
    ).populate('event')

    if (!task) {
      return res.status(404).json({ message: 'Task not found' })
    }

    res.json(task)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const task = await Task.findOneAndDelete({ _id: id, user: req.userId })

    if (!task) {
      return res.status(404).json({ message: 'Task not found' })
    }

    res.json({ message: 'Task deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}
