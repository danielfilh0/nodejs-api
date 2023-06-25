import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { makeUpdateUserUseCase } from '@/use-cases/factories/make-update-user-use-case'
import { UserNotExistsError } from '@/use-cases/errors/user-not-exists-error'

export async function deleteUser(request: FastifyRequest, reply: FastifyReply)  {
  const createUserParamsSchema = z.object({
    id: z.string(),
  })

  const { id } = createUserParamsSchema.parse(request.params)

  try {
    const createUserUseCase = makeUpdateUserUseCase()

    await createUserUseCase.execute(request.user.sub, {
      name,
    })
  } catch (err) {
    if (err instanceof UserNotExistsError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }

  return reply.status(204).send()
}
