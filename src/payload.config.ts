import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Courses } from './collections/Courses'
import { Inquiries } from './collections/Inquiries'
import { Lessons } from './collections/Lessons'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  serverURL:
    process.env.PAYLOAD_PUBLIC_SERVER_URL ||
    'https://ominous-couscous-pgvrjqvqvq929wg4-3000.app.github.dev/',
  csrf: [
    'http://localhost:3000',
    '/\.app\.github\.dev$/', // <- GitHub Dev environment
  ],
  cors: ['http://localhost:3000', '/\.app\.github\.dev$/'],

  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Courses, Inquiries, Lessons],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: vercelPostgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URL || '',
    },
  }),
  plugins: [
    vercelBlobStorage({
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
    }),
  ],
})
