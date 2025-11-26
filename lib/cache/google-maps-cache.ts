/**
 * Simple in-memory cache for Google Maps API responses
 *
 * Reduces API calls and improves performance
 */

import { GOOGLE_MAPS_CONFIG } from '@/config/google-maps'
import type { CachedData } from '@/lib/types/google-maps'

// In-memory cache store
const cache = new Map<string, CachedData<any>>()

// Cache key prefixes
export const CACHE_KEYS = {
  REVIEWS: 'reviews:',
  PLACE_DETAILS: 'place:',
  DIRECTIONS: 'directions:',
  GEOCODE: 'geocode:',
} as const

/**
 * Generate cache key from parameters
 */
export function generateCacheKey(
  prefix: string,
  params: Record<string, any>
): string {
  const sortedParams = Object.keys(params)
    .sort()
    .map((key) => `${key}=${JSON.stringify(params[key])}`)
    .join('&')

  return `${prefix}${sortedParams}`
}

/**
 * Set data in cache with TTL
 */
export function setCacheData<T>(
  key: string,
  data: T,
  ttl: number = GOOGLE_MAPS_CONFIG.cache.reviewsTTL
): void {
  const now = Date.now()
  const cachedData: CachedData<T> = {
    data,
    timestamp: now,
    expiresAt: now + ttl,
  }

  cache.set(key, cachedData)

  // Clean up expired entries periodically
  if (Math.random() < 0.1) {
    // 10% chance
    cleanExpiredCache()
  }
}

/**
 * Get data from cache if not expired
 */
export function getCacheData<T>(key: string): T | null {
  const cached = cache.get(key) as CachedData<T> | undefined

  if (!cached) {
    return null
  }

  // Check if expired
  if (Date.now() > cached.expiresAt) {
    cache.delete(key)
    return null
  }

  return cached.data
}

/**
 * Delete specific cache entry
 */
export function deleteCacheData(key: string): boolean {
  return cache.delete(key)
}

/**
 * Clear all cache entries
 */
export function clearCache(): void {
  cache.clear()
}

/**
 * Clear cache entries by prefix
 */
export function clearCacheByPrefix(prefix: string): number {
  let count = 0
  for (const key of cache.keys()) {
    if (key.startsWith(prefix)) {
      cache.delete(key)
      count++
    }
  }
  return count
}

/**
 * Clean up expired cache entries
 */
export function cleanExpiredCache(): number {
  const now = Date.now()
  let count = 0

  for (const [key, data] of cache.entries()) {
    if (now > data.expiresAt) {
      cache.delete(key)
      count++
    }
  }

  return count
}

/**
 * Get cache statistics
 */
export function getCacheStats(): {
  size: number
  expired: number
  fresh: number
} {
  const now = Date.now()
  let expired = 0
  let fresh = 0

  for (const data of cache.values()) {
    if (now > data.expiresAt) {
      expired++
    } else {
      fresh++
    }
  }

  return {
    size: cache.size,
    expired,
    fresh,
  }
}

/**
 * Check if cache has data for key (even if expired)
 */
export function hasCacheData(key: string): boolean {
  return cache.has(key)
}

/**
 * Get cache hit rate (for monitoring)
 */
let cacheHits = 0
let cacheMisses = 0

export function recordCacheHit(): void {
  cacheHits++
}

export function recordCacheMiss(): void {
  cacheMisses++
}

export function getCacheHitRate(): number {
  const total = cacheHits + cacheMisses
  return total === 0 ? 0 : cacheHits / total
}

export function resetCacheStats(): void {
  cacheHits = 0
  cacheMisses = 0
}

/**
 * High-level cache utility with automatic key generation
 */
export async function cachedFetch<T>(
  keyPrefix: string,
  params: Record<string, any>,
  fetchFn: () => Promise<T>,
  ttl?: number
): Promise<T> {
  const cacheKey = generateCacheKey(keyPrefix, params)
  const cached = getCacheData<T>(cacheKey)

  if (cached !== null) {
    recordCacheHit()
    return cached
  }

  recordCacheMiss()
  const data = await fetchFn()
  setCacheData(cacheKey, data, ttl)
  return data
}
