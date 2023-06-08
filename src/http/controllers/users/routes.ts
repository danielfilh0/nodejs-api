import { FastifyInstance } from 'fastify'

import { listUsers } from './list-users'
import { createUser } from '@/http/controllers/users/create-user'
import { authenticate } from './authenticate'

export async function userRoutes(app: FastifyInstance) {
  app.get('/users', listUsers)
  app.post('/users', createUser)
  app.post('/sessions', authenticate)
}
