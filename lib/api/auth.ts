import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  RefreshTokenRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  ChangePasswordRequest,
  VerifyEmailRequest,
  User,
} from '@/lib/types/auth'

const EXTERNAL_API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.latotravelapp.com'

export async function login(data: LoginRequest): Promise<AuthResponse> {
  const response = await fetch(`${EXTERNAL_API_URL}/api/v1/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    credentials: 'include',
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Login failed' }))
    throw new Error(error.message || 'Invalid email or password')
  }

  return response.json()
}

export async function register(data: RegisterRequest): Promise<AuthResponse> {
  const response = await fetch(`${EXTERNAL_API_URL}/api/v1/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    credentials: 'include',
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Registration failed' }))
    throw new Error(error.message || 'Registration failed. Please try again.')
  }

  return response.json()
}

export async function logout(accessToken: string): Promise<void> {
  try {
    await fetch(`${EXTERNAL_API_URL}/api/v1/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: 'include',
    })
  } catch (error) {
    console.error('Logout API call failed:', error)
  }
}

export async function refreshToken(
  data: RefreshTokenRequest
): Promise<{ accessToken: string; expiresIn: number }> {
  const response = await fetch(`${EXTERNAL_API_URL}/api/v1/auth/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error('Failed to refresh token')
  }

  const result = await response.json()
  return result.tokens || result
}

export async function getCurrentUser(accessToken: string): Promise<User> {
  const response = await fetch(`${EXTERNAL_API_URL}/api/v1/auth/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error('Failed to get user profile')
  }

  return response.json()
}

export async function forgotPassword(data: ForgotPasswordRequest): Promise<{ message: string }> {
  const response = await fetch(`${EXTERNAL_API_URL}/api/v1/auth/forgot-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Failed to send reset email' }))
    throw new Error(error.message)
  }

  return response.json()
}

export async function resetPassword(data: ResetPasswordRequest): Promise<{ message: string }> {
  const response = await fetch(`${EXTERNAL_API_URL}/api/v1/auth/reset-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Failed to reset password' }))
    throw new Error(error.message)
  }

  return response.json()
}

export async function changePassword(
  data: ChangePasswordRequest,
  accessToken: string
): Promise<{ message: string }> {
  const response = await fetch(`${EXTERNAL_API_URL}/api/v1/auth/change-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
    credentials: 'include',
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Failed to change password' }))
    throw new Error(error.message)
  }

  return response.json()
}

export async function verifyEmail(data: VerifyEmailRequest): Promise<{ message: string }> {
  const response = await fetch(`${EXTERNAL_API_URL}/api/v1/auth/verify-email`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Failed to verify email' }))
    throw new Error(error.message)
  }

  return response.json()
}

export async function resendVerificationEmail(email: string): Promise<{ message: string }> {
  const response = await fetch(`${EXTERNAL_API_URL}/api/v1/auth/resend-verification`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Failed to resend email' }))
    throw new Error(error.message)
  }

  return response.json()
}

export const getGoogleOAuthUrl = (): string => {
  return `${EXTERNAL_API_URL}/api/v1/auth/google`
}

export const getAppleOAuthUrl = (): string => {
  return `${EXTERNAL_API_URL}/api/v1/auth/apple`
}

export const getFacebookOAuthUrl = (): string => {
  return `${EXTERNAL_API_URL}/api/v1/auth/facebook`
}
