import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { SupabaseRepository } from '@/repositories/supabase/supabase-repository'
import { UpdateUserPhotoUseCase } from '../update-user-photo'

export function makeUpdatePhotoUserUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const supabaseRepository = new SupabaseRepository()
  const updateUserPhotoUseCase = new UpdateUserPhotoUseCase(prismaUsersRepository, supabaseRepository)

  return updateUserPhotoUseCase
}
