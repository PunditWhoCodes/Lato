export interface BasicAuthConfig {
  username: string
  password: string
}

export function isPasswordProtectionEnabled(): boolean {
  return process.env.SITE_PASSWORD_ENABLED === 'true'
}

export function getAuthCredentials(): BasicAuthConfig | null {
  const username = process.env.SITE_PASSWORD_USERNAME
  const password = process.env.SITE_PASSWORD_PASSWORD

  if (!username || !password) {
    return null
  }

  return { username, password }
}

export function parseBasicAuthHeader(authHeader: string | null): BasicAuthConfig | null {
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return null
  }

  try {
    const base64Credentials = authHeader.slice(6)
    const credentials = atob(base64Credentials)
    const [username, password] = credentials.split(':')

    if (!username || !password) {
      return null
    }

    return { username, password }
  } catch {
    return null
  }
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) {
    let result = 0
    for (let i = 0; i < a.length; i++) {
      result |= a.charCodeAt(i) ^ (b.charCodeAt(i % b.length) || 0)
    }
    return false
  }

  let result = 0
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i)
  }
  return result === 0
}

export function validateCredentials(
  provided: BasicAuthConfig,
  configured: BasicAuthConfig
): boolean {
  const usernameMatch = timingSafeEqual(provided.username, configured.username)
  const passwordMatch = timingSafeEqual(provided.password, configured.password)
  return usernameMatch && passwordMatch
}

export function createUnauthorizedResponse(realm: string = 'Lato Staging'): Response {
  return new Response('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': `Basic realm="${realm}", charset="UTF-8"`,
      'Content-Type': 'text/plain',
    },
  })
}
