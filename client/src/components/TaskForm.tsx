import { useState } from 'react'
import { tasksAPI } from '../services/api'
import toast from 'react-hot-toast'

interface TaskFormProps {
  events: Array<{ _id: string; title: string }>
  onTaskCreated: () => void
  onCancel: () => void
}

const TaskForm = ({ events, onTaskCreated, onCancel }: TaskFormProps) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    eventId: '',
    status: 'pending'
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await tasksAPI.createTask(formData)
      toast.success('Task created successfully!')
      onTaskCreated()
      setFormData({ title: '', description: '', eventId: '', status: 'pending' })
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to create task')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card p-8 animate-scale-in">
      <div className="mb-6">
        <h3 className="text-2xl font-display font-bold gradient-text mb-2">Create New Task</h3>
        <p className="text-neutral-600">Add a task to track your progress</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-neutral-700 mb-2">
              Task Title
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <input
                type="text"
                id="title"
                name="title"
                required
                className="input-field pl-10"
                placeholder="Enter task title"
                value={formData.title}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-neutral-700 mb-2">
              Description
            </label>
            <div className="relative">
              <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                <svg className="h-5 w-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <textarea
                id="description"
                name="description"
                rows={3}
                required
                className="input-field pl-10 resize-none"
                placeholder="Describe your task"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label htmlFor="eventId" className="block text-sm font-medium text-neutral-700 mb-2">
              Related Event
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <select
                id="eventId"
                name="eventId"
                required
                className="input-field pl-10"
                value={formData.eventId}
                onChange={handleChange}
              >
                <option value="">Select an event</option>
                {events.map((event) => (
                  <option key={event._id} value={event._id}>
                    {event.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-neutral-700 mb-2">
              Status
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <select
                id="status"
                name="status"
                className="input-field pl-10"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="btn-outline"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="spinner w-4 h-4 mr-2"></div>
                Creating...
              </>
            ) : (
              <>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Create Task
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default TaskForm
