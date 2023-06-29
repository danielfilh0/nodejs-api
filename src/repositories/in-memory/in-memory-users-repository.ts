import { User, Prisma, Role } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { UsersRepository } from '../users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async findById(id: string) {
    const user = this.items.find(item => item.id === id)

    if (!user) return null

    return user
  }

  async findByEmail(email: string) {
    const user = this.items.find(item => item.email === email)

    if (!user) return null

    return user
  }

  async list() {
    return this.items
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: data.id || randomUUID(),
      name: data.name,
      email: data.email,
      avatar_url: data.avatar_url as string,
      role: data.role as Role,
      password_hash: data.password_hash,
      created_at: new Date()
    }

    this.items.push(user)

    return user
  }

  async update(id: string, data: Prisma.UserUpdateInput) {
    const user = this.items.find((item) => item.id === id)

    const updatedUser = this.items.map((item) => {
      if (item.id === id) return { ...item, ...data }
      return item
    })

    this.items = updatedUser as User[]

    return { ...user, ...data as User }
  }

  async delete(id: string) {
    const user = this.items.find((item) => item.id === id)

    const users = this.items.filter((item) => item.id !== id)

    this.items = users

    return user as User
  }
}
