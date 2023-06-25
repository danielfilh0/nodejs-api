import { FastifyInstance } from 'fastify'

import { listUsers } from './list-users'
import { createUser } from '@/http/controllers/users/create-user'
import { authenticate } from './authenticate'
import { updateUserPhoto } from './update-user-photo'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { deleteUser } from './delete-user'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'

export async function userRoutes(app: FastifyInstance) {
  app.get('/users', listUsers)
  app.post('/users', createUser)
  app.post('/sessions',  authenticate)
  app.put('/users', createUser)
  app.patch('/users/photo', { onRequest: [verifyJWT] }, updateUserPhoto)
  app.delete('/users/:userId', { onRequest: [verifyJWT, verifyUserRole('ADMIN')] }, deleteUser)
}
