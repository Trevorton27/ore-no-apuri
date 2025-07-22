import type { CollectionConfig } from 'payload';

export type UserRole = 'admin' | 'instructor' | 'student';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  access: {
     admin: ({ req }) =>
      req.user?.role === 'admin' && req.user?.authProvider === 'payload',
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
  ],
};

export default Users;
