import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { eventsAPI, tasksAPI } from '../services/api'
import EventForm from '../components/EventForm'
import TaskForm from '../components/TaskForm'
import toast from 'react-hot-toast'

interface Event {
  _id: string
  title: string
  description: string
  date: string
  createdAt: string
}

interface Task {
  _id: string
  title: string
  description: string
  status: 'pending' | 'completed'
  event: Event
  createdAt: string
}

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<'events' | 'tasks'>('events')
  const [events, setEvents] = useState<Event[]>([])
  const [tasks, setTasks] = useState<Task[]>([])
  const [showEventForm, setShowEventForm] = useState(false)
  const [showTaskForm, setShowTaskForm] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    
    if (!token) {
      navigate('/login')
      return
    }
    
    fetchData()
  }, [navigate])

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const [eventsResponse, tasksResponse] = await Promise.all([
        eventsAPI.getEvents(),
        tasksAPI.getTasks()
      ])
      
      setEvents(eventsResponse.data)
      setTasks(tasksResponse.data)
    } catch (error: any) {
      setError(error.response?.data?.message || 'Failed to fetch data')
      
      if (error.response?.status === 401) {
        localStorage.removeItem('token')
        navigate('/login')
      } else {
        toast.error('Failed to fetch data')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  const handleEventCreated = () => {
    setShowEventForm(false)
    fetchData()
  }

  const handleTaskCreated = () => {
    setShowTaskForm(false)
    fetchData()
  }

  const handleDeleteEvent = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await eventsAPI.deleteEvent(id)
        toast.success('Event deleted successfully!')
        fetchData()
      } catch (error: any) {
        toast.error('Failed to delete event')
      }
    }
  }

  const handleDeleteTask = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await tasksAPI.deleteTask(id)
        toast.success('Task deleted successfully!')
        fetchData()
      } catch (error: any) {
        toast.error('Failed to delete task')
      }
    }
  }

  const handleTaskStatusChange = async (id: string, newStatus: 'pending' | 'completed') => {
    try {
      const task = tasks.find(t => t._id === id)
      if (task && task.event) {
        await tasksAPI.updateTask(id, {
          title: task.title,
          description: task.description,
          eventId: task.event._id,
          status: newStatus
        })
        toast.success('Task status updated!')
        fetchData()
      } else {
        toast.error('Cannot update task: Event not found')
      }
    } catch (error: any) {
      toast.error('Failed to update task status')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl shadow-lg mb-6 animate-pulse">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
          </div>
          <div className="spinner w-12 h-12 mx-auto mb-4"></div>
          <p className="text-neutral-600 font-primary">Loading your plans...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="card p-8">
            <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <div className="text-red-600 text-lg font-semibold mb-4">Oops! Something went wrong</div>
            <p className="text-neutral-600 mb-6">{error}</p>
            <button
              onClick={fetchData}
              className="btn-primary"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Header */}
      <header className="glass-effect backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center gap-4">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-display font-bold gradient-text">PlanIt</h1>
                <p className="text-sm text-neutral-500">Smart Planning Made Simple</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-neutral-800">Welcome back!</p>
                <p className="text-xs text-neutral-500">Ready to plan?</p>
              </div>
              <button
                onClick={handleLogout}
                className="btn-outline text-sm py-2 px-4"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Tabs */}
          <div className="card p-2 mb-6">
            <nav className="flex space-x-2">
              <button
                onClick={() => setActiveTab('events')}
                className={`flex-1 py-3 px-4 rounded-xl font-medium text-sm transition-all duration-200 ${
                  activeTab === 'events'
                    ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg'
                    : 'text-neutral-600 hover:text-neutral-800 hover:bg-neutral-100'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Events ({events.length})
                </div>
              </button>
              <button
                onClick={() => setActiveTab('tasks')}
                className={`flex-1 py-3 px-4 rounded-xl font-medium text-sm transition-all duration-200 ${
                  activeTab === 'tasks'
                    ? 'bg-gradient-to-r from-secondary-500 to-secondary-600 text-white shadow-lg'
                    : 'text-neutral-600 hover:text-neutral-800 hover:bg-neutral-100'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Tasks ({tasks.length})
                </div>
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="mt-6">
            {showEventForm ? (
              <EventForm onEventCreated={handleEventCreated} onCancel={() => setShowEventForm(false)} />
            ) : showTaskForm ? (
              <TaskForm events={events} onTaskCreated={handleTaskCreated} onCancel={() => setShowTaskForm(false)} />
            ) : activeTab === 'events' ? (
              <div className="card p-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-xl font-display font-bold text-neutral-800">Your Events</h2>
                    <p className="text-sm text-neutral-500">Plan and organize your upcoming events</p>
                  </div>
                  <button 
                    onClick={() => setShowEventForm(true)}
                    className="btn-primary"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add Event
                  </button>
                </div>
                {events.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-neutral-700 mb-2">No events yet</h3>
                    <p className="text-neutral-500 mb-4">Create your first event to get started with planning</p>
                    <button 
                      onClick={() => setShowEventForm(true)}
                      className="btn-primary"
                    >
                      Create Your First Event
                    </button>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {events.map((event) => (
                      <div key={event._id} className="card-hover p-6 border border-neutral-200">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                              <h3 className="text-lg font-semibold text-neutral-800">{event.title}</h3>
                            </div>
                            <p className="text-neutral-600 mb-3">{event.description}</p>
                            <div className="flex items-center gap-2 text-sm text-neutral-500">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              {new Date(event.date).toLocaleString()}
                            </div>
                          </div>
                          <button
                            onClick={() => handleDeleteEvent(event._id)}
                            className="ml-4 p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="card p-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-xl font-display font-bold text-neutral-800">Your Tasks</h2>
                    <p className="text-sm text-neutral-500">Manage and track your task progress</p>
                  </div>
                  <button 
                    onClick={() => setShowTaskForm(true)}
                    className="btn-secondary"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add Task
                  </button>
                </div>
                {tasks.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-secondary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-neutral-700 mb-2">No tasks yet</h3>
                    <p className="text-neutral-500 mb-4">Create your first task to start organizing your work</p>
                    <button 
                      onClick={() => setShowTaskForm(true)}
                      className="btn-secondary"
                    >
                      Create Your First Task
                    </button>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {tasks.map((task) => (
                      <div key={task._id} className="card-hover p-6 border border-neutral-200">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <div className={`w-2 h-2 rounded-full ${
                                task.status === 'completed' ? 'bg-secondary-500' : 'bg-accent-500'
                              }`}></div>
                              <h3 className="text-lg font-semibold text-neutral-800">{task.title}</h3>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                task.status === 'completed' 
                                  ? 'bg-secondary-100 text-secondary-700' 
                                  : 'bg-accent-100 text-accent-700'
                              }`}>
                                {task.status}
                              </span>
                            </div>
                            <p className="text-neutral-600 mb-3">{task.description}</p>
                            <div className="flex items-center gap-4 text-sm text-neutral-500">
                              <div className="flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                {task.event ? task.event.title : 'No Event'}
                              </div>
                              <div className="flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {new Date(task.createdAt).toLocaleDateString()}
                              </div>
                            </div>
                            <div className="mt-4">
                              <select
                                value={task.status}
                                onChange={(e) => handleTaskStatusChange(task._id, e.target.value as 'pending' | 'completed')}
                                disabled={!task.event}
                                className="text-sm border border-neutral-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-secondary-500 focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                <option value="pending">Pending</option>
                                <option value="completed">Completed</option>
                              </select>
                              {!task.event && (
                                <p className="text-xs text-red-500 mt-1">Cannot update: Task has no associated event</p>
                              )}
                            </div>
                          </div>
                          <button
                            onClick={() => handleDeleteTask(task._id)}
                            className="ml-4 p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard