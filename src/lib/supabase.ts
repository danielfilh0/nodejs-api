import { createClient } from '@supabase/supabase-js'
import { env } from '@/env'

export const publicSupabaseApp = createClient(env.SUPABASE_PROJECT_URL, env.SUPABASE_PUBLIC_API_KEY)

export const privateSupabaseApp = createClient(env.SUPABASE_PROJECT_URL, env.SUPABASE_PRIVATE_API_KEY)
