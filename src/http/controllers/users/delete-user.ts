import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { UserNotExistsError } from '@/use-cases/errors/user-not-exists-error'
import { makeDeleteUserUseCase } from '@/use-cases/factories/make-delete-user-use-case'

export async function deleteUser(request: FastifyRequest, reply: FastifyReply)  {
  const deleteUserParamsSchema = z.object({
    userId: z.string(),
  })

  const { userId } = deleteUserParamsSchema.parse(request.params)

  if (!userId) return reply.status(400).send({ message: 'Send an user ID' })

  try {
    const deleteUserUseCase = makeDeleteUserUseCase()

    await deleteUserUseCase.execute(userId)

  } catch (err) {
    if (err instanceof UserNotExistsError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }

  return reply.status(204).send()
}
