import { useState, useEffect } from 'react'
import type { Task, CreateTaskInput } from '../types'
import { getTasks, createTask, updateTask, deleteTask } from '../services/task.service'
import { useAuth } from '../contexts/AuthContext'
import AtvdCard from '../components/board/AtvdCard'
import ModalAtvd from '../components/board/ModalAtvd'

const COLUMNS: { id: Task['status']; label: string }[] = [
    { id: 'TODO', label: 'A fazer' },
    { id: 'IN_PROGRESS', label: 'Em progresso' },
    { id: 'DONE', label: 'Concluído' }
]

const columnStyles = {
    TODO: { header: 'bg-blue-50 text-blue-800', border: 'border-t-blue-400' },
    IN_PROGRESS: { header: 'bg-amber-50 text-amber-800', border: 'border-t-amber-400' },
    DONE: { header: 'bg-green-50 text-green-800', border: 'border-t-green-400' }
}

const Board = () => {
    const [tasks, setTasks] = useState<Task[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [modalOpen, setModalOpen] = useState<boolean>(false)
    const [taskToEdit, setTaskToEdit] = useState<Task | null>(null)
    const [savingTask, setSavingTask] = useState<boolean>(false)
    const [defaultStatus, setDefaultStatus] = useState<Task['status']>('TODO')

    const { user, logout } = useAuth()

    useEffect(() => {
        fetchTasks()
    }, [])

    const fetchTasks = async () => {
        try {
            const data = await getTasks()
            setTasks(data)
        } catch (error) {
            console.error('Erro ao buscar tasks:', error)
        } finally {
            setLoading(false)
        }
    }

    const getTasksByStatus = (status: Task['status']) => {
        return tasks
            .filter(task => task.status === status)
            .sort((a, b) => a.order - b.order)
    }

    const handleOpenCreate = (status: Task['status']) => {
        setTaskToEdit(null)
        setDefaultStatus(status)
        setModalOpen(true)
    }

    const handleOpenEdit = (task: Task) => {
        setTaskToEdit(task)
        setModalOpen(true)
    }

    const handleSave = async (data: CreateTaskInput) => {
        setSavingTask(true)
        try {
            if (taskToEdit) {
                const updated = await updateTask(taskToEdit.id, data)
                setTasks(prev => prev.map(t => t.id === updated.id ? updated : t))
            } else {
                const created = await createTask({ ...data, status: defaultStatus })
                setTasks(prev => [...prev, created])
            }
            setModalOpen(false)
        } catch (error) {
            console.error('Erro ao salvar task:', error)
        } finally {
            setSavingTask(false)
        }
    }

    const handleDelete = async (id: number) => {
        if (!confirm('Tem certeza que quer excluir essa tarefa?')) return
        try {
            await deleteTask(id)
            setTasks(prev => prev.filter(t => t.id !== id))
        } catch (error) {
            console.error('Erro ao excluir task:', error)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">


            <nav className="bg-white border-b border-gray-200 px-6 h-12 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <rect x="1" y="1" width="5" height="5" rx="1" fill="white" />
                            <rect x="8" y="1" width="5" height="5" rx="1" fill="white" fillOpacity=".6" />
                            <rect x="1" y="8" width="5" height="5" rx="1" fill="white" fillOpacity=".6" />
                            <rect x="8" y="8" width="5" height="5" rx="1" fill="white" />
                        </svg>
                    </div>
                    <span className="text-sm font-medium text-gray-800">Taskboard</span>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-500">Olá, {user?.name}</span>
                    <button
                        onClick={logout}
                        className="text-xs text-gray-400 hover:text-red-500 transition-colors"
                    >
                        Sair
                    </button>
                </div>
            </nav>

            <div className="p-6">
                {loading ? (
                    <div className="flex items-center justify-center h-64">
                        <p className="text-gray-400 text-sm">Carregando...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-3 gap-4">
                        {COLUMNS.map(column => (
                            <div key={column.id} className={`bg-white rounded-xl border-t-4 border border-gray-200 ${columnStyles[column.id].border}`}>


                                <div className="p-3 flex items-center justify-between">
                                    <span className={`text-xs font-medium px-2 py-1 rounded-md ${columnStyles[column.id].header}`}>
                                        {column.label}
                                    </span>
                                    <span className="text-xs text-gray-400">
                                        {getTasksByStatus(column.id).length}
                                    </span>
                                </div>

                                <div className="px-3 pb-2 flex flex-col gap-2 min-h-24">
                                    {getTasksByStatus(column.id).map(task => (
                                        <AtvdCard
                                            key={task.id}
                                            task={task}
                                            onEdit={handleOpenEdit}
                                            onDelete={handleDelete}
                                        />
                                    ))}
                                </div>

                                <div className="p-3 pt-1">
                                    {column.id === 'TODO' && (<button
                                        onClick={() => handleOpenCreate(column.id)}
                                        className="w-full text-xs text-gray-400 hover:text-gray-600 py-1.5 rounded-md border border-dashed border-gray-200 hover:border-gray-300 transition-colors"
                                    >
                                        + Nova tarefa
                                    </button>)}
                                </div>

                            </div>
                        ))}
                    </div>
                )}
            </div>

            <ModalAtvd
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onSave={handleSave}
                taskToEdit={taskToEdit}
                loading={savingTask}
            />

        </div>
    )
}

export default Board