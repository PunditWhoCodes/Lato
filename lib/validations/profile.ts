import { z } from 'zod'

// Phone number schema
export const phoneSchema = z.object({
  countryCode: z.string().min(1, 'Country code is required'),
  number: z.string().min(5, 'Phone number must be at least 5 digits'),
})

// Personal Information Schema
export const personalInfoSchema = z.object({
  title: z.enum(['Mr', 'Mrs', 'Ms', 'Dr']).optional(),
  firstName: z.string().min(1, 'First name is required').max(50, 'First name is too long'),
  lastName: z.string().min(1, 'Last name is required').max(50, 'Last name is too long'),
  email: z.string().email('Invalid email address'),
  dateOfBirth: z.string().optional(),
  phone: phoneSchema.optional(),
  nationality: z.string().optional(),
  height: z.string().optional(),
})

// Passport Information Schema
export const passportInfoSchema = z.object({
  number: z.string().min(5, 'Passport number must be at least 5 characters'),
  issueCountry: z.string().min(2, 'Issue country is required'),
  issueDate: z.string().min(1, 'Issue date is required'),
  expiryDate: z.string().min(1, 'Expiry date is required'),
}).refine((data) => {
  if (data.issueDate && data.expiryDate) {
    return new Date(data.expiryDate) > new Date(data.issueDate)
  }
  return true
}, {
  message: 'Expiry date must be after issue date',
  path: ['expiryDate'],
})

// Emergency Contact Schema
export const emergencyContactSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  relationship: z.string().optional(),
  phone: z.string().optional(),
})

// Travel Preference Schema
export const travelPreferenceSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
})

// Travel Insurance Schema
export const travelInsuranceSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
})

// Full Edit Profile Schema
export const editProfileSchema = z.object({
  title: z.enum(['Mr', 'Mrs', 'Ms', 'Dr']).optional(),
  firstName: z.string().min(1, 'First name is required').max(50),
  lastName: z.string().min(1, 'Last name is required').max(50),
  email: z.string().email('Invalid email address'),
  dateOfBirth: z.string().optional(),
  phone: phoneSchema.optional().nullable(),
  nationality: z.string().optional(),
  height: z.string().optional(),
  passport: passportInfoSchema.optional().nullable(),
  emergencyContacts: z.array(emergencyContactSchema).max(3, 'Maximum 3 emergency contacts allowed').optional(),
  travelPreference: travelPreferenceSchema.optional().nullable(),
  travelInsurance: travelInsuranceSchema.optional().nullable(),
})

// Change Password Schema
export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string()
    .min(8, 'Password must be at least 8 characters long'),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
})

// Simple change password schema (without confirm, as shown in Figma)
export const simpleChangePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string()
    .min(8, 'Password must be at least 8 characters long'),
})

// Type exports
export type PersonalInfoFormData = z.infer<typeof personalInfoSchema>
export type PassportInfoFormData = z.infer<typeof passportInfoSchema>
export type EmergencyContactFormData = z.infer<typeof emergencyContactSchema>
export type EditProfileFormData = z.infer<typeof editProfileSchema>
export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>
export type SimpleChangePasswordFormData = z.infer<typeof simpleChangePasswordSchema>
