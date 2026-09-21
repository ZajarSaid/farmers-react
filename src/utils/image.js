const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
const MAX_FILE_SIZE = 3 * 1024 * 1024
const DEFAULT_MAX_DIMENSION = 400

export function isAcceptedImage(file) {
  return Boolean(file && ACCEPTED_TYPES.includes(file.type))
}

export function readImageFile(file, maxDimension = DEFAULT_MAX_DIMENSION) {
  return new Promise((resolve, reject) => {
    if (!file || !isAcceptedImage(file)) {
      reject(new Error('Please choose a JPG, PNG, WEBP or GIF image file.'))
      return
    }
    if (file.size > MAX_FILE_SIZE) {
      reject(new Error('The image is too large. Please choose an image smaller than 3MB.'))
      return
    }
    const reader = new FileReader()
    reader.onerror = () => reject(new Error('Could not read the selected image.'))
    reader.onload = () => {
      const image = new Image()
      image.onerror = () => reject(new Error('The selected file is not a valid image.'))
      image.onload = () => {
        const ratio = Math.min(1, maxDimension / Math.max(image.width, image.height))
        const width = Math.max(1, Math.round(image.width * ratio))
        const height = Math.max(1, Math.round(image.height * ratio))
        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        const context = canvas.getContext('2d')
        context.drawImage(image, 0, 0, width, height)
        resolve(canvas.toDataURL('image/jpeg', 0.85))
      }
      image.src = reader.result
    }
    reader.readAsDataURL(file)
  })
}