import { CollectionConfig } from 'payload'

export const Lessons: CollectionConfig = {
  slug: 'lessons',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
    create: ({ req }) => req.user?.role === 'instructor' || req.user?.role === 'admin',
    update: ({ req }) => req.user?.role === 'instructor' || req.user?.role === 'admin',
    delete: ({ req }) => req.user?.role === 'admin',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'course',
      type: 'relationship',
      relationTo: 'courses',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
    },
    {
      name: 'videoUrl',
      type: 'text',
      required: false,
    },
    {
      name: 'instructor',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      hooks: {
        beforeChange: [
          ({ req, operation }) => {
            console.log('current user up in here tho: ', req.user)
            if (operation === 'create' && req.user?.role === 'instructor') {
              return req.user.id
            }
            return undefined
          },
        ],
      },
    },
  ],
}

export default Lessons
