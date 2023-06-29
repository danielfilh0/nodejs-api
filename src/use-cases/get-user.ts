import { UsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import { UserNotExistsError } from './errors/user-not-exists-error'

interface GetUserUseCaseResponse {
  user: User
}

export class GetUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(id: string): Promise<GetUserUseCaseResponse> {
    const user = await this.usersRepository.findById(id)

    if (!user) throw new UserNotExistsError()

    return { user }
  }
}

