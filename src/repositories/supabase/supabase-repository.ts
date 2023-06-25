import { privateSupabaseApp } from '@/lib/supabase'

interface FileOptions {
  name: string
  file: File | any
  contentType: string
}

export class SupabaseRepository {
  async uploadPhoto({ name, file, contentType }: FileOptions) {
    const { error } = await privateSupabaseApp
      .storage
      .from('images')
      .upload(name, file, {
        contentType,
        duplex: 'half',
        upsert: true 
      })
    if (error) return null

    const url = privateSupabaseApp.storage.from('images').getPublicUrl(name)
    return url.data.publicUrl
  }
}
