import { CollectionConfig } from 'payload';

export const Inquiries: CollectionConfig = {
  slug: 'inquiries',
  admin: {
    useAsTitle: 'email',
  },
  access: {
    create: () => true, // Anyone can submit
    read: ({ req }) => req.user?.role === 'admin',
    update: () => false,
    delete: () => false,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'message',
      type: 'textarea',
    },
  ],
};

export default Inquiries;
