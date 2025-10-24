import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const authAPI = {
  register: (userData: { name: string; email: string; password: string }) =>
    api.post('/auth/register', userData),
  login: (credentials: { email: string; password: string }) =>
    api.post('/auth/login', credentials),
}

export const eventsAPI = {
  getEvents: () => api.get('/events'),
  createEvent: (eventData: { title: string; description: string; date: string }) =>
    api.post('/events', eventData),
  updateEvent: (id: string, eventData: { title: string; description: string; date: string }) =>
    api.put(`/events/${id}`, eventData),
  deleteEvent: (id: string) => api.delete(`/events/${id}`),
}

export const tasksAPI = {
  getTasks: () => api.get('/tasks'),
  createTask: (taskData: { title: string; description: string; eventId: string; status?: string }) =>
    api.post('/tasks', taskData),
  updateTask: (id: string, taskData: { title: string; description: string; eventId: string; status: string }) =>
    api.put(`/tasks/${id}`, taskData),
  deleteTask: (id: string) => api.delete(`/tasks/${id}`),
}

export default api
