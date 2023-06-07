import { env } from '../../src/env'
import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const passwordHash = await hash(env.ROOT_USER_PASSWORD, 6)

  await prisma.user.create({
    data: {
      name: env.ROOT_USER_NAME,
      email: env.ROOT_USER_EMAIL,
      password_hash: passwordHash,
      role: 'ADMIN'
    }
  })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
