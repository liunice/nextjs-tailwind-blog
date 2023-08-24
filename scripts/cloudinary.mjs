import cloudinary from 'cloudinary'
import path from 'path'
import dotenv from 'dotenv'
import { generateThumbnail } from '../lib/image.mjs'

// load .env file
dotenv.config()

cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
})

async function uploadToCloudinary(imagePath) {
  // support uploading image to subfolders
  // cloudinary will create subfolders automatically if necessary
  const folder = path.join(process.env.NEXT_PUBLIC_CLOUDINARY_ROOT_FOLDER, path.dirname(imagePath))
  // public_id: ignore file extension
  const filename = path.parse(imagePath).name

  // delete and invalidate cache
  // cloudinary.v2.uploader.destroy(path.join(folder, filename), {
  //   invalidate: 'true',
  // })

  // upload
  const filePath = path.join(process.cwd(), 'public', imagePath)
  console.log(`uploading image to cloudinary: ${filePath}...`)
  try {
    const resp = await cloudinary.v2.uploader.upload(filePath, {
      folder,
      public_id: filename,
      resource_type: 'image',
    })
    console.log('image uploaded:', resp.public_id)
  } catch (error) {
    console.log('image upload failed:', error.message)
  }
}

;(async () => {
  if (process.argv.length < 3) {
    console.log('Usage: yarn image <imagePath> [slug]')
    return
  }

  const imagePath = `/static/images/${process.argv[2]}` // 2023/image.jpg
  await uploadToCloudinary(imagePath)

  const slug = process.argv[3] // 2023/hello-world
  if (slug) {
    await generateThumbnail(slug, imagePath)
  }
})()
