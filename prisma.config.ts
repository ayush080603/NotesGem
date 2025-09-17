import { defineConfig } from 'prisma/config'
import path from 'node:path'

export default defineConfig({
  schema: path.join('db', 'schema.prisma'),
  // optional: migrations directory (default: ./prisma/migrations)
  migrations: {
    path: path.join('db', 'migrations'),
  },
})
