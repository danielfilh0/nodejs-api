export class InvalidImageFormatError extends Error {
  constructor() {
    super('Invalid image format. Please send a PNG or JPEG format')
  }
}
