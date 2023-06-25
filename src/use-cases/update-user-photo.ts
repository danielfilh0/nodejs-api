import { UsersRepository } from '@/repositories/users-repository'
import { UserNotExistsError } from './errors/user-not-exists-error'
import { SupabaseRepository } from '@/repositories/supabase/supabase-repository'
import { UpdateUserPhotoError } from './errors/update-user-photo-error'
import { MultipartFile } from '@fastify/multipart'
import { InvalidImageFormatError } from './errors/invalid-image-format-error'
import { MaximumPhotoFileSizeError } from './errors/maximum-photo-file-size-error'

interface UpdateUserPhotoUseCaseRequest {
  id: string
  contentType: string
  length: number
  file: File | Blob | any
}

interface UpdateUserPhotoUseCaseResponse {
  photoURL: string
}

export class UpdateUserPhotoUseCase {
  constructor(private usersRepository: UsersRepository, private supabaseRepository: SupabaseRepository) {}

  async execute({
    id,
    contentType,
    length,
    file
  }: UpdateUserPhotoUseCaseRequest): Promise<UpdateUserPhotoUseCaseResponse> {
    const acceptedFiles = ['image/jpeg', 'image/png']
    if (!acceptedFiles.includes(contentType)) throw new InvalidImageFormatError()

    const maxFileSize = 2000000 // 2MB
    if (length > maxFileSize) throw new MaximumPhotoFileSizeError()

    const userExists = await this.usersRepository.findById(id)

    if (!userExists) throw new UserNotExistsError()

    const url = await this.supabaseRepository.uploadPhoto({
      name: `${id}/profile-photo`,
      file,
      contentType: contentType
    })

    if (!url) throw new UpdateUserPhotoError()

    await this.usersRepository.update(id, {
      avatar_url: url
    })

    return { photoURL: url }
  }
}

