import { Router } from 'express'
import * as taskController from '../controllers/task.controller'
import { authMiddleware } from '../middlewares/auth.middleware'

const router = Router()

// authMiddleware em todas as rotas — só usuário logado acessa
router.use(authMiddleware)

router.get('/', taskController.getTasks)
router.post('/', taskController.createTask)
router.put('/reorder', taskController.reorderTasks)
router.put('/:id', taskController.updateTask)
router.delete('/:id', taskController.deleteTask)

export default router