import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import * as profileApi from '@/lib/api/profile'
import type { UpdateProfileRequest, BookingStatus } from '@/lib/types/profile'
import { toast } from 'sonner'
import { useStore } from '@/lib/store'

// Query keys for profile-related queries
export const profileQueryKeys = {
  all: ['profile'] as const,
  data: () => [...profileQueryKeys.all, 'data'] as const,
  bookings: (status?: BookingStatus) => [...profileQueryKeys.all, 'bookings', status] as const,
  booking: (id: string) => [...profileQueryKeys.all, 'booking', id] as const,
  inbox: () => [...profileQueryKeys.all, 'inbox'] as const,
  message: (id: string) => [...profileQueryKeys.all, 'message', id] as const,
  reviews: () => [...profileQueryKeys.all, 'reviews'] as const,
  unreadCount: () => [...profileQueryKeys.all, 'unreadCount'] as const,
  credits: () => [...profileQueryKeys.all, 'credits'] as const,
}

// Fetch user profile - only when authenticated
export function useProfile() {
  const user = useStore((state) => state.user)
  const isHydrated = useStore((state) => state.isHydrated)

  return useQuery({
    queryKey: profileQueryKeys.data(),
    queryFn: profileApi.getProfile,
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: isHydrated && !!user, // Only fetch when store is hydrated and user exists
  })
}

// Update user profile
export function useUpdateProfile() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UpdateProfileRequest) => profileApi.updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: profileQueryKeys.data() })
      toast.success('Profile updated successfully')
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update profile')
    },
  })
}

// Upload avatar
export function useUploadAvatar() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (file: File) => profileApi.uploadAvatar(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: profileQueryKeys.data() })
      toast.success('Avatar updated successfully')
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to upload avatar')
    },
  })
}

// Fetch user bookings
export function useBookings(status?: BookingStatus) {
  return useQuery({
    queryKey: profileQueryKeys.bookings(status),
    queryFn: () => profileApi.getBookings(status),
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}

// Fetch single booking
export function useBooking(bookingId: string) {
  return useQuery({
    queryKey: profileQueryKeys.booking(bookingId),
    queryFn: () => profileApi.getBookingById(bookingId),
    enabled: !!bookingId,
  })
}

// Cancel booking
export function useCancelBooking() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (bookingId: string) => profileApi.cancelBooking(bookingId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: profileQueryKeys.bookings() })
      toast.success('Booking cancelled successfully')
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to cancel booking')
    },
  })
}

// Fetch inbox messages
export function useInboxMessages() {
  return useQuery({
    queryKey: profileQueryKeys.inbox(),
    queryFn: profileApi.getInboxMessages,
    staleTime: 1 * 60 * 1000, // 1 minute
  })
}

// Fetch single message
export function useMessage(messageId: string) {
  return useQuery({
    queryKey: profileQueryKeys.message(messageId),
    queryFn: () => profileApi.getMessageById(messageId),
    enabled: !!messageId,
  })
}

// Mark message as read
export function useMarkMessageAsRead() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (messageId: string) => profileApi.markMessageAsRead(messageId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: profileQueryKeys.inbox() })
      queryClient.invalidateQueries({ queryKey: profileQueryKeys.unreadCount() })
    },
  })
}

// Mark all messages as read
export function useMarkAllMessagesAsRead() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: profileApi.markAllMessagesAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: profileQueryKeys.inbox() })
      queryClient.invalidateQueries({ queryKey: profileQueryKeys.unreadCount() })
      toast.success('All messages marked as read')
    },
  })
}

// Delete message
export function useDeleteMessage() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (messageId: string) => profileApi.deleteMessage(messageId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: profileQueryKeys.inbox() })
      toast.success('Message deleted')
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete message')
    },
  })
}

// Fetch user reviews
export function useUserReviews() {
  return useQuery({
    queryKey: profileQueryKeys.reviews(),
    queryFn: profileApi.getUserReviews,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// Delete review
export function useDeleteReview() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (reviewId: string) => profileApi.deleteReview(reviewId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: profileQueryKeys.reviews() })
      toast.success('Review deleted')
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete review')
    },
  })
}

// Fetch unread count
export function useUnreadCount() {
  return useQuery({
    queryKey: profileQueryKeys.unreadCount(),
    queryFn: profileApi.getUnreadCount,
    staleTime: 30 * 1000, // 30 seconds
    refetchInterval: 60 * 1000, // Refetch every minute
  })
}

// Fetch travel credits
export function useTravelCredits() {
  return useQuery({
    queryKey: profileQueryKeys.credits(),
    queryFn: profileApi.getTravelCredits,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}
