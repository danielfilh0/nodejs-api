import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { ListUsersUseCase } from './list-users'

let usersRepository: InMemoryUsersRepository
let sut: ListUsersUseCase

describe('List Users Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new ListUsersUseCase(usersRepository)
  })

  it('should be able to list all users', async () => {
    await usersRepository.create({
      id: '1',
      name: 'John Doe 1',
      email: 'johndoe1@example.com',
      password_hash: '123456',
      role: 'MEMBER',
      created_at: new Date()
    })

    await usersRepository.create({
      id: '2',
      name: 'John Doe 2',
      email: 'johndoe2@example.com',
      password_hash: '123456',
      role: 'MEMBER',
      created_at: new Date()
    })

    const { users } = await sut.execute()

    expect(users).toHaveLength(2)
    expect(users).toEqual([
      expect.objectContaining({ name: 'John Doe 1' }),
      expect.objectContaining({ name: 'John Doe 2' }),
    ])
  })
})
