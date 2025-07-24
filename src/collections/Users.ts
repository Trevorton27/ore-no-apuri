import type { CollectionConfig } from 'payload'

export type UserRole = 'admin' | 'instructor' | 'student'
export type AuthProvider = 'payload' | 'clerk'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  access: {
    admin: ({ req }) => req.user?.role === 'admin' && req.user?.authProvider === 'payload',
  },

  fields: [
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'student',
      options: ['admin', 'instructor', 'student'],
    },
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'authProvider',
      type: 'select',
      options: ['payload', 'clerk'],
      defaultValue: 'payload',
      required: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'clerkId',
      type: 'text',
      required: true,
      unique: true,
    },
  ],
}

export default Users
