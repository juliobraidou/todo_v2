import api from './api'
import type { Task, CreateTaskInput, UpdateTaskInput } from '../types'

export const getTasks = async (): Promise<Task[]> => {
  const response = await api.get<Task[]>('/tasks')
  return response.data
}

export const createTask = async (data: CreateTaskInput): Promise<Task> => {
  const response = await api.post<Task>('/tasks', data)
  return response.data
}

export const updateTask = async (id: number, data: UpdateTaskInput): Promise<Task> => {
  const response = await api.put<Task>(`/tasks/${id}`, data)
  return response.data
}

export const deleteTask = async (id: number): Promise<void> => {
  await api.delete(`/tasks/${id}`)
}

export const reorderTasks = async (tasks: { id: number; status: Task['status']; order: number }[]): Promise<void> => {
  await api.put('/tasks/reorder', { tasks })
}