import type { Task } from "../../types";

interface AtvdCardProps {
    task: Task,
    onEdit: (task: Task) => void,
    onDelete: (id: number) => void;
}

const statusBorder = {
    TODO: 'border-transparent',
    IN_PROGRESS: 'border-l-amber-500',
    DONE: 'border-l-green-500',
}


const AtvdCard = ({ task, onEdit, onDelete }: AtvdCardProps) => {
    return (
        <div className={`
            bg-white rounded-lg border border-gray-200 border-l-4 p-3
            cursor-grab hover:border-gray-300 transition-colors
            ${statusBorder[task.status]}`}>

            <p className={`text-sm font-medium text-gray-800
                ${task.status === 'DONE' ? 'line-through text-gray-400' : ''}`}>{task.title}</p>

            {task.description && (
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                    {task.description}</p>
            )}

            <div className="flex gap-2 justify-end mt-3">
                <button
                    onClick={() => onEdit(task)}
                    className="text-xs text-blue-500 hover:text-blue-700 transition-colors">
                    Editar
                </button>


                <button
                    onClick={() => onDelete(task.id)}
                    className="text-xs text-red-400 hover:text-red-600 transition-colors">
                    Excluir
                </button>
            </div>


        </div>
    )
}

export default AtvdCard;