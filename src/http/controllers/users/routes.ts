import { FastifyInstance } from 'fastify'

import { listUsers } from './list-users'
import { createUser } from '@/http/controllers/users/create-user'
import { authenticate } from './authenticate'
import { updateUserPhoto } from './update-user-photo'
import { verifyJWT } from '@/http/middlewares/verify-jwt'

export async function userRoutes(app: FastifyInstance) {
  app.get('/users', listUsers)
  app.post('/users', createUser)
  app.post('/sessions',  authenticate)
  app.put('/users', createUser)
  app.patch('/users/photo', { onRequest: [verifyJWT] }, updateUserPhoto)
}
