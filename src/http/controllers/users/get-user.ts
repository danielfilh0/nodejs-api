import { FastifyRequest, FastifyReply } from 'fastify'

import { makeGetUserUseCase } from '@/use-cases/factories/make-get-user-use-case'

export async function getUser(request: FastifyRequest, reply: FastifyReply)  {
  const getUserUseCase = makeGetUserUseCase()

  const { sub } = request.user

  const { user } = await getUserUseCase.execute(sub)

  const userWithoutPass = {
    id: user.id,
    name: user.name,
    email: user.email,
    avatar_url: user.avatar_url,
    role: user.role,
    created_at: user.created_at
  }

  return reply.status(200).send(userWithoutPass)
}
