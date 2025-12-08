export type UserRole = 'TRAVELER' | 'PROVIDER' | 'ADMIN'

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  avatar?: string
  emailVerified?: boolean
  createdAt?: string
  updatedAt?: string
}

export interface AuthTokens {
  accessToken: string
  refreshToken: string
  expiresIn: number // seconds
}

export interface AuthResponse {
  user: User
  tokens: AuthTokens
}

// Request types
export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  password: string
  name: string
  role: UserRole
}

export interface RefreshTokenRequest {
  refreshToken: string
}

export interface ForgotPasswordRequest {
  email: string
}

export interface ResetPasswordRequest {
  token: string
  newPassword: string
}

export interface ChangePasswordRequest {
  currentPassword: string
  newPassword: string
}

export interface VerifyEmailRequest {
  token: string
}

// Response types
export interface ApiError {
  message: string
  code?: string
  field?: string
}

export interface ApiResponse<T = any> {
  data?: T
  error?: ApiError
  message?: string
}
