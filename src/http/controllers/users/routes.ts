import { FastifyInstance } from 'fastify'

import { createUser } from '@/http/controllers/users/create-user'

export async function userRoutes(app: FastifyInstance) {
  app.post('/users', createUser)
}
