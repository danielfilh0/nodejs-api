export class MaximumPhotoFileSizeError extends Error {
  constructor() {
    super('Photo file size is superior. Please send until 2MB.')
  }
}
