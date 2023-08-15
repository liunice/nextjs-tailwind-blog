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
  // TODO: support nested image path
  const rootFolder = process.env.NEXT_PUBLIC_CLOUDINARY_ROOT_FOLDER
  // public_id: ignore file extension
  const publicId = imagePath.replace(/\.[^/.]+$/, '')
  const filePath = path.join(process.cwd(), 'public', imagePath)
  console.log(`uploading image to cloudinary: ${filePath}...`)
  const resp = await cloudinary.v2.uploader.upload(filePath, {
    folder: rootFolder,
    public_id: publicId,
    resource_type: 'image',
  })

  if (resp.public_id) {
    console.log('image uploaded:', resp.public_id)
  } else {
    console.log('image upload failed')
    console.log(resp)
  }
}

;(async () => {
  const imagePath = `/static/images/${process.argv[2]}` // 2023/image.jpg
  await uploadToCloudinary(imagePath)

  const slug = process.argv[3] // 2023/hello-world
  await generateThumbnail(slug, imagePath)
})()
