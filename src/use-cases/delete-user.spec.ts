import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { UserNotExistsError } from './errors/user-not-exists-error'
import { DeleteUserUseCase } from './delete-user'

let usersRepository: InMemoryUsersRepository
let sut: DeleteUserUseCase

describe('Delete User Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new DeleteUserUseCase(usersRepository)
  })

  it('should be able to delete user', async () => {
    const user = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: '123456'
    })

    const deletedUser = await usersRepository.delete(user.id)

    const users = await usersRepository.list()

    expect(user.name).toEqual(deletedUser.name)
    expect(user.email).toEqual(deletedUser.email)
    expect(user.password_hash).toEqual(deletedUser.password_hash)
    expect(users).length(0)
  })

  it('should not be able to delete an inexistent user', async () => {
    await expect(async () => sut.execute('1234')
    ).rejects.toBeInstanceOf(UserNotExistsError)
  })
})
