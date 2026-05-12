interface CustomButtonProps {
    label: string
    onClick?: () => void
    type?: 'button' | 'submit'   // só aceita esses dois valores
    variant?: 'primary' | 'secondary'
    disabled?: boolean
    loading?: boolean
}

const CustomButton = ({
    label,
    onClick,
    type = 'button',
    variant = 'primary',
    disabled = false,
    loading = false
}: CustomButtonProps) => {

    const baseClasses = 'w-full py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200'

    const variantClasses = {
        primary: 'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300',
        secondary: 'bg-transparent text-gray-600 border border-gray-300 hover:bg-gray-50 disabled:opacity-50'
    }

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            className={`${baseClasses} ${variantClasses[variant]}`}
        >
            {loading ? 'Carregando...' : label}
        </button>
    )
}

export default CustomButton