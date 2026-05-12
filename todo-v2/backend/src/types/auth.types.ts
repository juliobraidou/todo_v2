export interface RegisterInput {
  name: string
  email: string
  password: string
}

export interface LoginInput {
  email: string
  password: string
}

// O que fica "guardado" dentro do token JWT
export interface JwtPayload {
  userId: number
  email: string
}