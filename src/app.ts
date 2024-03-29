import fastify from 'fastify'
import { env } from './env'
import { ZodError } from 'zod'
import { userRoutes } from './http/controllers/users/routes'
import fastifyJwt from '@fastify/jwt'
import fastifyMultipart from '@fastify/multipart'

export const app = fastify()

app.register(fastifyMultipart)

app.register(fastifyJwt, {
  secret: env.JWT_SECRET
})

app.register(userRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({
        message: 'Validation error.',
        issues: error.format()
      })
  }

  if (env.NODE_ENV !== 'production') {
    console.log(error)
  } else {
    // TODO: Here we should log to an external tool like DataDog/NewRelic/Sentry
  }

  return reply.status(500).send({ message: 'Internal server error' })
})
