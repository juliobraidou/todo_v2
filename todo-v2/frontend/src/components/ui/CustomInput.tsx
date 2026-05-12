interface CustomInputProps {
    label: string
    type?: string        // opcional — padrão vai ser 'text'
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    placeholder?: string
    error?: string       // mensagem de erro abaixo do input
}

const CustomInput = ({ label, type = 'text', value, onChange, placeholder, error }: CustomInputProps) => {
    return (
        <div className="flex flex-col gap-1 w-full">

            <label className="text-sm font-medium text-gray-700"> {label}</label>
            <input type={type} value={value} onChange={onChange} placeholder={placeholder} className={`
          w-full px-3 py-2 rounded-lg border text-sm outline-none transition-colors
          ${error
                    ? 'border-red-400 focus:border-red-500'
                    : 'border-gray-300 focus:border-blue-500'
                }
        `}
            /> {/*  final do input */}

            {error && (
                <span className="text-red-500 text-xs">{error}</span>
            )}
        </div>
    )
}

export default CustomInput;