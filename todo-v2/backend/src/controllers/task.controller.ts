import { Request, Response } from 'express'
import * as taskService from '../services/task.service'

export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await taskService.getTasks(req.user!.userId)
    res.json(tasks)
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
}

export const createTask = async (req: Request, res: Response) => {
  try {
    const task = await taskService.createTask(req.user!.userId, req.body)
    res.status(201).json(task)
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
}

export const updateTask = async (req: Request, res: Response) => {
  try {
    // req.params.id vem como string da URL, precisamos converter para número
    const task = await taskService.updateTask(
      req.user!.userId,
      Number(req.params.id),
      req.body
    )
    res.json(task)
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
}

export const deleteTask = async (req: Request, res: Response) => {
  try {
    await taskService.deleteTask(req.user!.userId, Number(req.params.id))
    res.status(204).send() // 204 = sucesso sem conteúdo para retornar
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
}

export const reorderTasks = async (req: Request, res: Response) => {
  try {
    await taskService.reorderTasks(req.user!.userId, req.body)
    res.json({ message: 'Tasks reordenadas com sucesso' })
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
}