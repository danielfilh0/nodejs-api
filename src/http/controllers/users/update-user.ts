import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { makeUpdateUserUseCase } from '@/use-cases/factories/make-update-user-use-case'
import { UserNotExistsError } from '@/use-cases/errors/user-not-exists-error'

export async function updateUser(request: FastifyRequest, reply: FastifyReply)  {
  const createUserBodySchema = z.object({
    name: z.string(),
  })

  const { name } = createUserBodySchema.parse(request.body)

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
