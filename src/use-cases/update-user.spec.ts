import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { UpdateUserUseCase } from './update-user'
import { UserNotExistsError } from './errors/user-not-exists-error'
import { User } from '.prisma/client'

let usersRepository: InMemoryUsersRepository
let sut: UpdateUserUseCase

describe('Update User Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new UpdateUserUseCase(usersRepository)
  })

  it('should be able to update user', async () => {
    const { id } = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: '123456'
    })

    const { user: updatedUser } = await sut.execute(id, {
      name: 'John Doe 2',
      email: 'johndoe2@example.com',
      password_hash: '1234567'
    })

    const user = await usersRepository.findById(id) as User

    expect(user.name).toEqual(updatedUser.name)
    expect(user.email).toEqual(updatedUser.email)
    expect(user.password_hash).toEqual(updatedUser.password_hash)
  })

  it('should not be able to update an inexistent user', async () => {
    await expect(() =>
      sut.execute(String(Math.random()), {
        name: 'John Doe 2',
        email: 'johndoe2@example.com',
        password_hash: '1234567'
      })
    ).rejects.toBeInstanceOf(UserNotExistsError)
  })
})
