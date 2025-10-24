import express from 'express'
import { body } from 'express-validator'
import { 
  getEvents, 
  createEvent, 
  updateEvent, 
  deleteEvent 
} from '../controllers/eventController'
import { auth } from '../middleware/auth'

const router = express.Router()

const eventValidation = [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('date').isISO8601().withMessage('Valid date is required')
]

router.use(auth)

router.get('/', getEvents)
router.post('/', eventValidation, createEvent)
router.put('/:id', eventValidation, updateEvent)
router.delete('/:id', deleteEvent)

export default router
