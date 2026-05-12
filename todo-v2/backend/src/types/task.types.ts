import { Status } from '@prisma/client'

export interface CreateTaskInput {
  title: string
  description?: string
  status?: Status
}

export interface UpdateTaskInput {
  title?: string
  description?: string
  status?: Status
  order?: number
}

export interface ReorderTasksInput {
  tasks: {
    id: number
    status: Status
    order: number
  }[]
}