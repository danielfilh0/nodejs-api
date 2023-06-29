import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { GetUserUseCase } from './get-user'
import { UserNotExistsError } from './errors/user-not-exists-error'

let usersRepository: InMemoryUsersRepository
let sut: GetUserUseCase

describe('Get User Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserUseCase(usersRepository)
  })

  it('should be able to get an user', async () => {
    const id = '12345'
    await usersRepository.create({
      id,
      name: 'John Doe 1',
      email: 'johndoe1@example.com',
      password_hash: '123456',
      role: 'MEMBER',
      created_at: new Date()
    })

    const { user } = await sut.execute(id)

    expect(user.email).toEqual('johndoe1@example.com')
  })

  it('should not be able to get user with wrong id', async () => {
    expect(() => sut.execute('non-existing-id'))
      .rejects.toBeInstanceOf(UserNotExistsError)
  })
})
