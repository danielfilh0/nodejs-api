import { FastifyRequest, FastifyReply } from 'fastify'
import { makeUpdatePhotoUserUseCase } from '@/use-cases/factories/make-update-user-photo-use-case'
import { MaximumPhotoFileSizeError } from '@/use-cases/errors/maximum-photo-file-size-error'
import { InvalidImageFormatError } from '@/use-cases/errors/invalid-image-format-error'
import { UserNotExistsError } from '@/use-cases/errors/user-not-exists-error'
import { UpdateUserPhotoError } from '@/use-cases/errors/update-user-photo-error'

export async function updateUserPhoto(request: FastifyRequest, reply: FastifyReply)  {
  try {
    const file = await request.file()
    if (!file || file.fieldname !== 'photo') {
      return reply.status(404).send({ message: 'Photo file not found.' })
    } 
  
    const updateUserPhotoUseCase = makeUpdatePhotoUserUseCase()
  
    await updateUserPhotoUseCase.execute({
      id: request.user.sub,
      contentType: file.mimetype,
      length: file.file.readableLength,
      file: file.file
    })
  } catch (err) {
    if (
      err instanceof MaximumPhotoFileSizeError ||
      err instanceof InvalidImageFormatError ||
      err instanceof UpdateUserPhotoError
    ) return reply.status(403).send({ message: err.message })
    if (err instanceof UserNotExistsError) {
      return reply.status(404).send({ message: err.message })
    }
  }

  return reply.status(204).send()
}
