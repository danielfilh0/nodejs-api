import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { DeleteUserUseCase } from '../delete-user'

export function makeDeleteUserUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const deleteUserUseCase = new DeleteUserUseCase(prismaUsersRepository)

  return deleteUserUseCase
}
