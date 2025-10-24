import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import Event from '../models/Event'

export const getEvents = async (req: Request, res: Response) => {
  try {
    const events = await Event.find({ user: req.userId }).sort({ date: 1 })
    res.json(events)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}

export const createEvent = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { title, description, date } = req.body

    const event = new Event({
      title,
      description,
      date,
      user: req.userId
    })

    await event.save()
    res.status(201).json(event)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}

export const updateEvent = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { id } = req.params
    const { title, description, date } = req.body

    const event = await Event.findOneAndUpdate(
      { _id: id, user: req.userId },
      { title, description, date },
      { new: true }
    )

    if (!event) {
      return res.status(404).json({ message: 'Event not found' })
    }

    res.json(event)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}

export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const event = await Event.findOneAndDelete({ _id: id, user: req.userId })

    if (!event) {
      return res.status(404).json({ message: 'Event not found' })
    }

    res.json({ message: 'Event deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}
