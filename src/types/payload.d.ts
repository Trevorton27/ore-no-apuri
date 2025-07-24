// Import the base User type from Payload.
import { User as PayloadUser } from 'payload/auth'

// Augment the module so that `req.user` includes these additional properties.
declare module 'payload/auth' {
  interface User extends PayloadUser {
    role?: 'admin' | 'instructor' | 'student'
    authProvider?: 'payload' | 'clerk'
  }
}
