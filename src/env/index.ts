import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  JWT_SECRET: z.string(),
  PORT: z.coerce.number().default(3333),
  ROOT_USER_NAME: z.string(),
  ROOT_USER_EMAIL: z.string().email(),
  ROOT_USER_PASSWORD: z.string().min(6),
  SUPABASE_PROJECT_URL: z.string(),
  SUPABASE_PUBLIC_API_KEY: z.string(),
  SUPABASE_PRIVATE_API_KEY: z.string()
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('✖️ Invalid environment variables', _env.error.format())

  throw new Error('Invalid environment variables.')
}

export const env = _env.data
