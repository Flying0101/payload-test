// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
// import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { slateEditor } from '@payloadcms/richtext-slate'
import { Users } from './collections/Users'
import { Admins } from './collections/Admins'
import { Media } from './collections/Media'
import { Ticket } from './collections/Ticket'
import { Sign } from './collections/Sign'
import { Horoscope } from './collections/Horoscope'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Admins.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Admins, Users, Media, Ticket, Sign, Horoscope],
  // editor: lexicalEditor({}),
  editor: slateEditor({}),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  cors: ['http://localhost:3000', 'https://mitt-horoskop.vercel.app'],
  csrf: [
    // whitelist of domains to allow cookie auth from
    'http://localhost:3000',
    'https://mitt-horoskop.vercel.app',
  ],
  plugins: [
    // storage-adapter-placeholder
  ],
})
