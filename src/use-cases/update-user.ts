import { Prisma } from '@prisma/client'
import { UsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import { UserNotExistsError } from './errors/user-not-exists-error'

interface UpdateUserUseCaseResponse {
  user: User
}

export class UpdateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(id: string, data: Prisma.UserUpdateInput): Promise<UpdateUserUseCaseResponse> {
    const userExists = await this.usersRepository.findById(id)

    if (!userExists) throw new UserNotExistsError()
    
    const user = await this.usersRepository.update(id, data)

    return { user }
  }
}

