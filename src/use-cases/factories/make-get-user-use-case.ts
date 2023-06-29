import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { GetUserUseCase } from '../get-user'

export function makeGetUserUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const getUserUseCase = new GetUserUseCase(prismaUsersRepository)

  return getUserUseCase
}
