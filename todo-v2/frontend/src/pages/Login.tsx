import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { login as loginService } from '../services/auth.service'
import CustomInput from '../components/ui/CustomInput'
import CustomButton from '../components/ui/CustomButton'

const Login = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const navigate = useNavigate()
    const { login } = useAuth()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError(null)
        setLoading(true)

        try {
            const response = await loginService(email, password)

            login(response.token, response.user)

            navigate('/board')
        } catch (err: any) {
            setError(err.response?.data?.message || 'Erro ao fazer login')
        } finally {

            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl border border-gray-200 p-8 w-full max-w-sm">

                <div className="text-center mb-6">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg mx-auto mb-3 flex items-center justify-center">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <rect x="2" y="2" width="7" height="7" rx="1.5" fill="white" />
                            <rect x="11" y="2" width="7" height="7" rx="1.5" fill="white" fillOpacity=".6" />
                            <rect x="2" y="11" width="7" height="7" rx="1.5" fill="white" fillOpacity=".6" />
                            <rect x="11" y="11" width="7" height="7" rx="1.5" fill="white" />
                        </svg>
                    </div>
                    <h1 className="text-lg font-medium text-gray-800">Taskboard</h1>
                    <p className="text-sm text-gray-500 mt-1">Entre na sua conta</p>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg px-3 py-2 mb-4">
                        <p className="text-xs text-red-600">{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <CustomInput
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="seu@email.com"
                    />
                    <CustomInput
                        label="Senha"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Sua senha"
                    />

                    <CustomButton
                        label="Entrar"
                        type="submit"
                        loading={loading}
                    />
                </form>

                <div className="flex items-center gap-2 my-4">
                    <div className="flex-1 h-px bg-gray-200" />
                    <span className="text-xs text-gray-400">ou</span>
                    <div className="flex-1 h-px bg-gray-200" />
                </div>

                <p className="text-center text-sm text-gray-500">
                    Não tem conta?{' '}
                    <span
                        onClick={() => navigate('/register')}
                        className="text-blue-600 cursor-pointer hover:underline"
                    >
                        Cadastre-se
                    </span>
                </p>

            </div>
        </div>
    )
}

export default Login