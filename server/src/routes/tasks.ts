import express from 'express'
import { body } from 'express-validator'
import { 
  getTasks, 
  createTask, 
  updateTask, 
  deleteTask 
} from '../controllers/taskController'
import { auth } from '../middleware/auth'

const router = express.Router()

const taskValidation = [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('eventId').notEmpty().withMessage('Event ID is required'),
  body('status').isIn(['pending', 'completed']).withMessage('Status must be pending or completed')
]

router.use(auth)

router.get('/', getTasks)
router.post('/', taskValidation, createTask)
router.put('/:id', taskValidation, updateTask)
router.delete('/:id', deleteTask)

export default router
