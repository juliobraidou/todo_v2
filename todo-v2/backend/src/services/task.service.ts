import prisma from '../config/prisma'
import { CreateTaskInput, UpdateTaskInput, ReorderTasksInput } from '../types/task.types'

// Busca todas as tasks do usuário, ordenadas por status e posição
export const getTasks = async (userId: number) => {
  return prisma.task.findMany({
    where: { userId },
    orderBy: [{ status: 'asc' }, { order: 'asc' }]
  })
}

export const createTask = async (userId: number, data: CreateTaskInput) => {
  // Descobre quantas tasks já existem naquele status para definir a ordem
  const count = await prisma.task.count({
    where: { userId, status: data.status || 'TODO' }
  })

  return prisma.task.create({
    data: {
      title: data.title,
      description: data.description,
      status: data.status || 'TODO',
      order: count, // Nova task vai para o final da coluna
      userId
    }
  })
}

export const updateTask = async (userId: number, taskId: number, data: UpdateTaskInput) => {
  // Verifica se a task existe e pertence ao usuário logado
  const task = await prisma.task.findFirst({
    where: { id: taskId, userId }
  })

  if (!task) {
    throw new Error('Task não encontrada')
  }

  return prisma.task.update({
    where: { id: taskId },
    data
  })
}

export const deleteTask = async (userId: number, taskId: number) => {
  const task = await prisma.task.findFirst({
    where: { id: taskId, userId }
  })

  if (!task) {
    throw new Error('Task não encontrada')
  }

  return prisma.task.delete({
    where: { id: taskId }
  })
}

// Chamado quando o usuário solta um card após arrastar
// Recebe a nova ordem e status de todas as tasks afetadas
export const reorderTasks = async (userId: number, data: ReorderTasksInput) => {
  // Usa uma transaction — ou todas as atualizações acontecem, ou nenhuma
  // Evita o board ficar em estado inconsistente se algo der errado no meio
  const updates = data.tasks.map(task =>
    prisma.task.updateMany({
      where: { id: task.id, userId },
      data: { status: task.status, order: task.order }
    })
  )

  return prisma.$transaction(updates)
}