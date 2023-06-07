import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { ListUsersUseCase } from '../list-users'

export function makeListUsersUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const listUsersUseCase = new ListUsersUseCase(prismaUsersRepository)

  return listUsersUseCase
}
