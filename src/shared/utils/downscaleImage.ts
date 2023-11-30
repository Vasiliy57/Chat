export const downscaleImage = (
  dataUrl: string | ArrayBuffer | null,
  newWidth: number,
  imageType: string,
  imageArguments: number
) => {
  let image, oldWidth, oldHeight, newHeight, canvas, ctx, newDataUrl

  // Provide default values
  imageType = imageType || 'image/jpeg'
  imageArguments = imageArguments || 0.7

  // Create a temporary image so that we can compute the height of the downscaled image.
  image = new Image()
  image.src = dataUrl
  image.onload = () => {
    oldWidth = image.width
    oldHeight = image.height
    newHeight = Math.floor((oldHeight / oldWidth) * newWidth)

    // Create a temporary canvas to draw the downscaled image on.
    canvas = document.createElement('canvas')
    canvas.width = newWidth
    canvas.height = newHeight

    // Draw the downscaled image on the canvas and return the new data URL.
    ctx = canvas.getContext('2d')
    ctx.drawImage(image, 0, 0, newWidth, newHeight)
    newDataUrl = canvas.toDataURL(imageType, imageArguments)
    console.log('Img:', image)
    console.log('Width:', image.width)
    console.log('Height:', image.height)
    return newDataUrl
  }
}
