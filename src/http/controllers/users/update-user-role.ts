import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { makeUpdateUserUseCase } from '@/use-cases/factories/make-update-user-use-case'
import { UserNotExistsError } from '@/use-cases/errors/user-not-exists-error'

export async function updateUserRole(request: FastifyRequest, reply: FastifyReply)  {
  const updateUserRoleParamsSchema = z.object({
    userId: z.string(),
  })

  const { userId } = updateUserRoleParamsSchema.parse(request.params)

  try {
    const updateUserUseCase = makeUpdateUserUseCase()

    await updateUserUseCase.execute(userId, {
      role: 'ADMIN',
    })
  } catch (err) {
    if (err instanceof UserNotExistsError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }

  return reply.status(204).send()
}
