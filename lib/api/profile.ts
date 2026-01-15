import { supabase } from '@/lib/supabase'
import type {
  UserProfile,
  UpdateProfileRequest,
  Booking,
  InboxMessage,
  UserReview,
  BookingStatus,
  EmergencyContact,
} from '@/lib/types/profile'

// Database row types
interface ProfileRow {
  id: string
  title: string | null
  first_name: string | null
  last_name: string | null
  date_of_birth: string | null
  phone_country_code: string | null
  phone_number: string | null
  nationality: string | null
  height: string | null
  passport_number: string | null
  passport_issue_country: string | null
  passport_issue_date: string | null
  passport_expiry_date: string | null
  travel_pref_first_name: string | null
  travel_pref_last_name: string | null
  travel_ins_first_name: string | null
  travel_ins_last_name: string | null
  travel_credits: number
  currency: string
  avatar_url: string | null
  created_at: string
  updated_at: string
  emergency_contacts?: EmergencyContactRow[]
}

interface EmergencyContactRow {
  id: string
  user_id: string
  first_name: string
  last_name: string
  relationship: string | null
  phone: string | null
  created_at: string
}

/**
 * Transform database row to UserProfile type
 */
function transformToUserProfile(row: ProfileRow, email: string): UserProfile {
  return {
    id: row.id,
    email: email,
    name: [row.first_name, row.last_name].filter(Boolean).join(' ') || 'User',
    avatar: row.avatar_url || undefined,
    title: row.title as UserProfile['title'],
    firstName: row.first_name || '',
    lastName: row.last_name || '',
    dateOfBirth: row.date_of_birth || undefined,
    phone: row.phone_country_code && row.phone_number
      ? { countryCode: row.phone_country_code, number: row.phone_number }
      : undefined,
    nationality: row.nationality || undefined,
    height: row.height || undefined,
    passport: row.passport_number
      ? {
          number: row.passport_number,
          issueCountry: row.passport_issue_country || '',
          issueDate: row.passport_issue_date || '',
          expiryDate: row.passport_expiry_date || '',
        }
      : undefined,
    emergencyContacts: row.emergency_contacts?.map((c) => ({
      id: c.id,
      firstName: c.first_name,
      lastName: c.last_name,
      relationship: c.relationship || undefined,
      phone: c.phone || undefined,
    })),
    travelPreference: row.travel_pref_first_name || row.travel_pref_last_name
      ? {
          firstName: row.travel_pref_first_name || '',
          lastName: row.travel_pref_last_name || '',
        }
      : undefined,
    travelInsurance: row.travel_ins_first_name || row.travel_ins_last_name
      ? {
          firstName: row.travel_ins_first_name || '',
          lastName: row.travel_ins_last_name || '',
        }
      : undefined,
    travelCredits: row.travel_credits || 0,
    currency: row.currency || 'INR',
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

/**
 * Transform UpdateProfileRequest to database format
 */
function transformToDbFormat(data: UpdateProfileRequest): Record<string, unknown> {
  return {
    title: data.title || null,
    first_name: data.firstName || null,
    last_name: data.lastName || null,
    date_of_birth: data.dateOfBirth || null,
    phone_country_code: data.phone?.countryCode || null,
    phone_number: data.phone?.number || null,
    nationality: data.nationality || null,
    height: data.height || null,
    passport_number: data.passport?.number || null,
    passport_issue_country: data.passport?.issueCountry || null,
    passport_issue_date: data.passport?.issueDate || null,
    passport_expiry_date: data.passport?.expiryDate || null,
    travel_pref_first_name: data.travelPreference?.firstName || null,
    travel_pref_last_name: data.travelPreference?.lastName || null,
    travel_ins_first_name: data.travelInsurance?.firstName || null,
    travel_ins_last_name: data.travelInsurance?.lastName || null,
  }
}

/**
 * Get current user profile from Supabase
 */
export async function getProfile(): Promise<UserProfile> {
  const { data: { user }, error: userError } = await supabase.auth.getUser()

  if (userError || !user) {
    throw new Error('Not authenticated')
  }

  const { data, error } = await supabase
    .from('profiles')
    .select('*, emergency_contacts(*)')
    .eq('id', user.id)
    .single()

  if (error) {
    // If profile doesn't exist, create one
    if (error.code === 'PGRST116') {
      const { data: newProfile, error: createError } = await supabase
        .from('profiles')
        .insert({
          id: user.id,
          first_name: user.user_metadata?.name || user.email?.split('@')[0] || '',
          last_name: '',
        })
        .select('*, emergency_contacts(*)')
        .single()

      if (createError) {
        throw new Error('Failed to create profile')
      }

      return transformToUserProfile(newProfile as ProfileRow, user.email || '')
    }

    throw new Error(error.message || 'Failed to fetch profile')
  }

  return transformToUserProfile(data as ProfileRow, user.email || '')
}

/**
 * Update user profile in Supabase
 */
export async function updateProfile(data: UpdateProfileRequest): Promise<UserProfile> {
  const { data: { user }, error: userError } = await supabase.auth.getUser()

  if (userError || !user) {
    throw new Error('Not authenticated')
  }

  // Update profile
  const { data: updatedProfile, error } = await supabase
    .from('profiles')
    .update(transformToDbFormat(data))
    .eq('id', user.id)
    .select()
    .single()

  if (error) {
    throw new Error(error.message || 'Failed to update profile')
  }

  // Handle emergency contacts separately
  if (data.emergencyContacts !== undefined) {
    // Delete existing contacts
    await supabase
      .from('emergency_contacts')
      .delete()
      .eq('user_id', user.id)

    // Insert new contacts (up to 3)
    if (data.emergencyContacts && data.emergencyContacts.length > 0) {
      const contactsToInsert = data.emergencyContacts.slice(0, 3).map((c) => ({
        user_id: user.id,
        first_name: c.firstName,
        last_name: c.lastName,
      }))

      await supabase
        .from('emergency_contacts')
        .insert(contactsToInsert)
    }
  }

  // Fetch updated profile with contacts
  const { data: finalProfile, error: fetchError } = await supabase
    .from('profiles')
    .select('*, emergency_contacts(*)')
    .eq('id', user.id)
    .single()

  if (fetchError) {
    throw new Error('Failed to fetch updated profile')
  }

  return transformToUserProfile(finalProfile as ProfileRow, user.email || '')
}

/**
 * Upload user avatar to Supabase Storage
 */
export async function uploadAvatar(file: File): Promise<{ avatarUrl: string }> {
  const { data: { user }, error: userError } = await supabase.auth.getUser()

  if (userError || !user) {
    throw new Error('Not authenticated')
  }

  const fileExt = file.name.split('.').pop()
  const fileName = `${user.id}/avatar.${fileExt}`

  // Upload to Supabase Storage
  const { error: uploadError } = await supabase.storage
    .from('avatars')
    .upload(fileName, file, { upsert: true })

  if (uploadError) {
    throw new Error('Failed to upload avatar')
  }

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('avatars')
    .getPublicUrl(fileName)

  // Update profile with avatar URL
  await supabase
    .from('profiles')
    .update({ avatar_url: publicUrl })
    .eq('id', user.id)

  return { avatarUrl: publicUrl }
}

// ============================================
// Bookings, Inbox, Reviews - Placeholder implementations
// These can be connected to Supabase tables later
// ============================================

/**
 * Get user bookings
 * TODO: Connect to Supabase bookings table when available
 */
export async function getBookings(status?: BookingStatus): Promise<Booking[]> {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  // Return empty array for now - implement when bookings table is created
  return []
}

/**
 * Get single booking by ID
 */
export async function getBookingById(bookingId: string): Promise<Booking> {
  throw new Error('Booking not found')
}

/**
 * Cancel a booking
 */
export async function cancelBooking(bookingId: string): Promise<void> {
  throw new Error('Not implemented')
}

/**
 * Get inbox messages
 * TODO: Connect to Supabase messages table when available
 */
export async function getInboxMessages(): Promise<InboxMessage[]> {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  // Return empty array for now
  return []
}

/**
 * Get single message by ID
 */
export async function getMessageById(messageId: string): Promise<InboxMessage> {
  throw new Error('Message not found')
}

/**
 * Mark message as read
 */
export async function markMessageAsRead(messageId: string): Promise<void> {
  // Not implemented yet
}

/**
 * Mark all messages as read
 */
export async function markAllMessagesAsRead(): Promise<void> {
  // Not implemented yet
}

/**
 * Delete a message
 */
export async function deleteMessage(messageId: string): Promise<void> {
  throw new Error('Not implemented')
}

/**
 * Get user reviews
 * TODO: Connect to Supabase reviews table when available
 */
export async function getUserReviews(): Promise<UserReview[]> {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  // Return empty array for now
  return []
}

/**
 * Delete a review
 */
export async function deleteReview(reviewId: string): Promise<void> {
  throw new Error('Not implemented')
}

/**
 * Get unread message count
 */
export async function getUnreadCount(): Promise<number> {
  return 0
}

/**
 * Get travel credits balance
 */
export async function getTravelCredits(): Promise<{ amount: number; currency: string }> {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const { data, error } = await supabase
    .from('profiles')
    .select('travel_credits, currency')
    .eq('id', user.id)
    .single()

  if (error) {
    return { amount: 0, currency: 'INR' }
  }

  return {
    amount: data.travel_credits || 0,
    currency: data.currency || 'INR',
  }
}
