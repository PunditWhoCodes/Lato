import { supabase } from '@/lib/supabase'
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

/**
 * Login with email and password using Supabase
 */
export async function login(data: LoginRequest): Promise<AuthResponse> {
  const { data: authData, error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  })

  if (error) {
    throw new Error(error.message || 'Invalid email or password')
  }

  if (!authData.user || !authData.session) {
    throw new Error('Login failed. Please try again.')
  }

  // Map Supabase user to our User type
  const user: User = {
    id: authData.user.id,
    email: authData.user.email || '',
    name: authData.user.user_metadata?.name || authData.user.email?.split('@')[0] || 'User',
    role: (authData.user.user_metadata?.role as User['role']) || 'TRAVELER',
    avatar: authData.user.user_metadata?.avatar,
    emailVerified: authData.user.email_confirmed_at !== null,
    createdAt: authData.user.created_at,
  }

  return {
    user,
    tokens: {
      accessToken: authData.session.access_token,
      refreshToken: authData.session.refresh_token,
      expiresIn: authData.session.expires_in || 3600,
    },
  }
}

/**
 * Check if email is already registered
 * Supabase doesn't have a direct API, so we check by attempting signUp
 * If identities array is empty, user already exists (with email confirmation enabled)
 */
export async function checkEmailExists(email: string): Promise<boolean> {
  try {
    // Use a more reliable method - try to sign in with OTP (passwordless)
    // If user exists, no error is thrown. If not, Supabase creates the user.
    // This isn't ideal, so we'll use a different approach.

    // Actually, let's check using signInWithPassword with a dummy password
    // If error is "Invalid login credentials" - user exists
    // If error is "Email not confirmed" - user exists but unverified
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: '__check_exists_dummy_password__',
    })

    if (error) {
      // "Invalid login credentials" means user exists but wrong password
      // "Email not confirmed" means user exists but hasn't verified
      if (error.message.includes('Invalid login credentials') ||
          error.message.includes('Email not confirmed')) {
        return true
      }
      // Other errors likely mean user doesn't exist or other issues
      return false
    }

    // If no error (unlikely with dummy password), user exists
    return true
  } catch {
    return false
  }
}

/**
 * Register new user with Supabase
 */
export async function register(data: RegisterRequest): Promise<AuthResponse> {
  const { data: authData, error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        name: data.name,
        role: data.role || 'TRAVELER',
      },
      emailRedirectTo: `${typeof window !== 'undefined' ? window.location.origin : ''}/auth/callback?type=email_verification`,
    },
  })

  if (error) {
    throw new Error(error.message || 'Registration failed. Please try again.')
  }

  if (!authData.user) {
    throw new Error('Registration failed. Please try again.')
  }

  // Check if user already exists (Supabase returns empty identities array for existing users)
  // This is Supabase's way of preventing email enumeration
  if (authData.user.identities && authData.user.identities.length === 0) {
    throw new Error('An account with this email already exists. Please sign in instead.')
  }

  // For Supabase, if email confirmation is disabled, session will be returned
  // If email confirmation is enabled, session will be null
  const session = authData.session

  const user: User = {
    id: authData.user.id,
    email: authData.user.email || '',
    name: data.name,
    role: data.role || 'TRAVELER',
    emailVerified: authData.user.email_confirmed_at !== null,
    createdAt: authData.user.created_at,
  }

  return {
    user,
    tokens: {
      accessToken: session?.access_token || `pending_${authData.user.id}`,
      refreshToken: session?.refresh_token || '',
      expiresIn: session?.expires_in || 3600,
    },
  }
}

/**
 * Logout user from Supabase
 */
export async function logout(accessToken: string): Promise<void> {
  try {
    await supabase.auth.signOut()
  } catch (error) {
    console.error('Logout error:', error)
  }
}

/**
 * Refresh access token using Supabase
 */
export async function refreshToken(
  data: RefreshTokenRequest
): Promise<{ accessToken: string; expiresIn: number }> {
  const { data: authData, error } = await supabase.auth.refreshSession({
    refresh_token: data.refreshToken,
  })

  if (error || !authData.session) {
    throw new Error('Failed to refresh token')
  }

  return {
    accessToken: authData.session.access_token,
    expiresIn: authData.session.expires_in || 3600,
  }
}

/**
 * Get current user from Supabase session
 */
export async function getCurrentUser(accessToken: string): Promise<User> {
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    throw new Error('Failed to get user profile')
  }

  return {
    id: user.id,
    email: user.email || '',
    name: user.user_metadata?.name || user.email?.split('@')[0] || 'User',
    role: (user.user_metadata?.role as User['role']) || 'TRAVELER',
    avatar: user.user_metadata?.avatar,
    emailVerified: user.email_confirmed_at !== null,
    createdAt: user.created_at,
  }
}

/**
 * Send password reset email via Supabase
 */
export async function forgotPassword(data: ForgotPasswordRequest): Promise<{ message: string }> {
  const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
    redirectTo: `${window.location.origin}/reset-password`,
  })

  if (error) {
    throw new Error(error.message || 'Failed to send reset email')
  }

  return { message: 'Password reset email sent successfully' }
}

/**
 * Reset password with token via Supabase
 */
export async function resetPassword(data: ResetPasswordRequest): Promise<{ message: string }> {
  const { error } = await supabase.auth.updateUser({
    password: data.newPassword,
  })

  if (error) {
    throw new Error(error.message || 'Failed to reset password')
  }

  return { message: 'Password reset successfully' }
}

/**
 * Change password for authenticated user via Supabase
 */
export async function changePassword(
  data: ChangePasswordRequest,
  accessToken: string
): Promise<{ message: string }> {
  // First verify current password by re-authenticating
  const { data: { user } } = await supabase.auth.getUser()

  if (!user?.email) {
    throw new Error('User not found')
  }

  // Verify current password
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: user.email,
    password: data.currentPassword,
  })

  if (signInError) {
    throw new Error('Current password is incorrect')
  }

  // Update to new password
  const { error } = await supabase.auth.updateUser({
    password: data.newPassword,
  })

  if (error) {
    throw new Error(error.message || 'Failed to change password')
  }

  return { message: 'Password changed successfully' }
}

/**
 * Verify email - handled by Supabase automatically via magic link
 */
export async function verifyEmail(data: VerifyEmailRequest): Promise<{ message: string }> {
  // Supabase handles email verification through magic links
  // This function is kept for API compatibility
  return { message: 'Email verified successfully' }
}

/**
 * Resend verification email via Supabase
 */
export async function resendVerificationEmail(email: string): Promise<{ message: string }> {
  const { error } = await supabase.auth.resend({
    type: 'signup',
    email: email,
  })

  if (error) {
    throw new Error(error.message || 'Failed to resend email')
  }

  return { message: 'Verification email sent successfully' }
}

/**
 * Sign in with Google OAuth via Supabase
 */
export async function signInWithGoogle(): Promise<void> {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  })

  if (error) {
    throw new Error(error.message || 'Failed to sign in with Google')
  }
}

/**
 * Sign in with Apple OAuth via Supabase
 */
export async function signInWithApple(): Promise<void> {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'apple',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  })

  if (error) {
    throw new Error(error.message || 'Failed to sign in with Apple')
  }
}

// Legacy URL functions - kept for compatibility but now use Supabase OAuth
export const getGoogleOAuthUrl = (): string => {
  return '#google-oauth' // Will be handled by signInWithGoogle()
}

export const getAppleOAuthUrl = (): string => {
  return '#apple-oauth' // Will be handled by signInWithApple()
}

export const getFacebookOAuthUrl = (): string => {
  return '#facebook-oauth'
}
