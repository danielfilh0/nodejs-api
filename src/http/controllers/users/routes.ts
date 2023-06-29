import { FastifyInstance } from 'fastify'

import { listUsers } from './list-users'
import { createUser } from '@/http/controllers/users/create-user'
import { authenticate } from './authenticate'
import { updateUserPhoto } from './update-user-photo'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { deleteUser } from './delete-user'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'
import { updateUserRole } from './update-user-role'
import { updateUser } from './update-user'

export async function userRoutes(app: FastifyInstance) {
  app.get('/users',{ onRequest: [verifyUserRole('ADMIN')] }, listUsers, )
  app.post('/users', createUser)
  app.post('/sessions',  authenticate)
  app.put('/users', { onRequest: [verifyJWT] }, updateUser)
  app.patch('/users/photo', { onRequest: [verifyJWT] }, updateUserPhoto)
  app.patch('/users/:userId/role', { onRequest: [verifyJWT, verifyUserRole('ADMIN')] }, updateUserRole)
  app.delete('/users/:userId', { onRequest: [verifyJWT, verifyUserRole('ADMIN')] }, deleteUser)
}
