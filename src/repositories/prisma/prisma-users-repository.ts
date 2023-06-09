import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

import { UsersRepository } from '../users-repository'

export class PrismaUsersRepository implements UsersRepository {
  async findById(id: string){
    const user = await prisma.user.findUnique({ where: { id } })

    return user
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({ where: { email } })

    return user
  }

  async list() {
    const users = await prisma.user.findMany()

    return users
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({ data })

    return user
  }

  async update(id: string, data: Prisma.UserUpdateInput) {
    const user = await prisma.user.update({ where: { id }, data })

    return user
  }
}
