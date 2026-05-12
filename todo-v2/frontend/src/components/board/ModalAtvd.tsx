import { useState, useEffect } from 'react'
import type { Task, CreateTaskInput } from '../../types'
import CustomInput from '../ui/CustomInput'
import CustomButton from '../ui/CustomButton'

interface ModalAtvdProps {
    isOpen: boolean
    onClose: () => void
    onSave: (data: CreateTaskInput) => void
    taskToEdit?: Task | null
    loading?: boolean
}

const ModalAtvd = ({ isOpen, onClose, onSave, taskToEdit, loading }: ModalAtvdProps) => {
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [status, setStatus] = useState<Task['status']>('TODO')
    const [errors, setErrors] = useState<{ title?: string }>({})


    useEffect(() => {
        if (taskToEdit) {
            setTitle(taskToEdit.title)
            setDescription(taskToEdit.description || '')
            setStatus(taskToEdit.status)
        } else {
            setTitle('')
            setDescription('')
            setStatus('TODO')
        }
        setErrors({})
    }, [taskToEdit, isOpen])

    const validate = () => {
        if (!title.trim()) {
            setErrors({ title: 'O título é obrigatório' })
            return false
        }
        return true
    }

    const handleSave = () => {
        if (!validate()) return
        onSave({ title, description, status })
    }

    if (!isOpen) return null

    return (

        <div
            className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
            onClick={onClose}
        >

            <div
                className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-base font-medium text-gray-800">
                        {taskToEdit ? 'Editar tarefa' : 'Nova tarefa'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 text-xl leading-none"
                    >
                        ×
                    </button>
                </div>

                <div className="flex flex-col gap-3">
                    <CustomInput
                        label="Título"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Ex: Criar tela de login"
                        error={errors.title}
                    />

                    <CustomInput
                        label="Descrição"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Descrição opcional"
                    />


                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-700">Status</label>
                        <div className="flex gap-2">
                            {(['TODO', 'IN_PROGRESS', 'DONE'] as Task['status'][]).map((s) => (
                                <button
                                    key={s}
                                    onClick={() => setStatus(s)}
                                    className={`
                    text-xs px-3 py-1.5 rounded-full border transition-colors
                    ${status === s
                                            ? 'bg-blue-600 text-white border-blue-600'
                                            : 'bg-white text-gray-500 border-gray-300 hover:border-gray-400'
                                        }
                  `}
                                >
                                    {s === 'TODO' ? 'A fazer' : s === 'IN_PROGRESS' ? 'Em progresso' : 'Concluído'}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex gap-2 mt-5">
                    <CustomButton
                        label="Cancelar"
                        variant="secondary"
                        onClick={onClose}
                    />
                    <CustomButton
                        label={taskToEdit ? 'Salvar' : 'Criar tarefa'}
                        onClick={handleSave}
                        loading={loading}
                    />
                </div>
            </div>
        </div>
    )
}

export default ModalAtvd