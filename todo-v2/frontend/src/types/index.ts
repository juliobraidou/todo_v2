export interface User {
  id: number
  name: string
  email: string
}

export interface Task {
  id: number
  title: string
  description: string | null
  status: 'TODO' | 'IN_PROGRESS' | 'DONE'
  order: number
  userId: number
  createdAt: string
  updatedAt: string
}

export interface AuthResponse {
  token: string
  user: User
}

export interface CreateTaskInput {
  title: string
  description?: string
  status?: 'TODO' | 'IN_PROGRESS' | 'DONE'
}

export interface UpdateTaskInput {
  title?: string
  description?: string
  status?: 'TODO' | 'IN_PROGRESS' | 'DONE'
  order?: number
}