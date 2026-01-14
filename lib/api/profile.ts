import { api } from './client'
import type {
  UserProfile,
  ProfileResponse,
  UpdateProfileRequest,
  Booking,
  BookingsResponse,
  InboxMessage,
  InboxResponse,
  UserReview,
  ReviewsResponse,
  BookingStatus,
} from '@/lib/types/profile'

// Get current user profile
export async function getProfile(): Promise<UserProfile> {
  const response = await api.get<ProfileResponse>('/v1/user/profile', {
    requiresAuth: true,
  })
  return response.data
}

// Update user profile
export async function updateProfile(data: UpdateProfileRequest): Promise<UserProfile> {
  const response = await api.patch<ProfileResponse>('/v1/user/profile', data, {
    requiresAuth: true,
  })
  return response.data
}

// Upload user avatar
export async function uploadAvatar(file: File): Promise<{ avatarUrl: string }> {
  const formData = new FormData()
  formData.append('avatar', file)

  const response = await fetch('/api/v1/user/avatar', {
    method: 'POST',
    body: formData,
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error('Failed to upload avatar')
  }

  return response.json()
}

// Get user bookings with optional status filter
export async function getBookings(status?: BookingStatus): Promise<Booking[]> {
  const params = status ? `?status=${status}` : ''
  const response = await api.get<BookingsResponse>(`/v1/user/bookings${params}`, {
    requiresAuth: true,
  })
  return response.data
}

// Get single booking details
export async function getBookingById(bookingId: string): Promise<Booking> {
  const response = await api.get<{ data: Booking }>(`/v1/user/bookings/${bookingId}`, {
    requiresAuth: true,
  })
  return response.data
}

// Cancel a booking
export async function cancelBooking(bookingId: string): Promise<void> {
  await api.patch(`/v1/user/bookings/${bookingId}/cancel`, {}, {
    requiresAuth: true,
  })
}

// Get inbox messages
export async function getInboxMessages(): Promise<InboxMessage[]> {
  const response = await api.get<InboxResponse>('/v1/user/inbox', {
    requiresAuth: true,
  })
  return response.data
}

// Get single message
export async function getMessageById(messageId: string): Promise<InboxMessage> {
  const response = await api.get<{ data: InboxMessage }>(`/v1/user/inbox/${messageId}`, {
    requiresAuth: true,
  })
  return response.data
}

// Mark message as read
export async function markMessageAsRead(messageId: string): Promise<void> {
  await api.patch(`/v1/user/inbox/${messageId}/read`, {}, {
    requiresAuth: true,
  })
}

// Mark all messages as read
export async function markAllMessagesAsRead(): Promise<void> {
  await api.patch('/v1/user/inbox/read-all', {}, {
    requiresAuth: true,
  })
}

// Delete a message
export async function deleteMessage(messageId: string): Promise<void> {
  await api.delete(`/v1/user/inbox/${messageId}`, {
    requiresAuth: true,
  })
}

// Get user reviews
export async function getUserReviews(): Promise<UserReview[]> {
  const response = await api.get<ReviewsResponse>('/v1/user/reviews', {
    requiresAuth: true,
  })
  return response.data
}

// Delete a review
export async function deleteReview(reviewId: string): Promise<void> {
  await api.delete(`/v1/user/reviews/${reviewId}`, {
    requiresAuth: true,
  })
}

// Get unread message count
export async function getUnreadCount(): Promise<number> {
  const response = await api.get<{ count: number }>('/v1/user/inbox/unread-count', {
    requiresAuth: true,
  })
  return response.count
}

// Get travel credits balance
export async function getTravelCredits(): Promise<{ amount: number; currency: string }> {
  const response = await api.get<{ data: { amount: number; currency: string } }>('/v1/user/credits', {
    requiresAuth: true,
  })
  return response.data
}
