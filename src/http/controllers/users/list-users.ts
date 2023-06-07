import { FastifyRequest, FastifyReply } from 'fastify'

import { makeListUsersUseCase } from '@/use-cases/factories/make-list-users-use-case'

export async function listUsers(request: FastifyRequest, reply: FastifyReply)  {
  const listUsersUseCase = makeListUsersUseCase()

  const { users } = await listUsersUseCase.execute()

  return reply.status(200).send(users)
}
