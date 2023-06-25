import { UsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import { UserNotExistsError } from './errors/user-not-exists-error'

interface DeleteUserUseCaseResponse {
  user: User
}

export class DeleteUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(id: string): Promise<DeleteUserUseCaseResponse> {
    const userExists = await this.usersRepository.findById(id)

    if (!userExists) throw new UserNotExistsError()

    const user = await this.usersRepository.delete(id)

    return { user }
  }
}

