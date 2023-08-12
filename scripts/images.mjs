import cloudinary from 'cloudinary'
import path from 'path'
import dotenv from 'dotenv'

// load .env file
dotenv.config({
  path: path.resolve(process.cwd(), '.env.local'),
})

cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
})

const uploadToCloudinary = async () => {
  const filename = process.argv[2]
  const folder = `${process.env.NEXT_PUBLIC_CLOUDINARY_ROOT_FOLDER}/static/images`
  // public_id: ignore file extension
  const public_id = filename.replace(/\.[^/.]+$/, '')
  const filePath = path.join(process.cwd(), 'public/static/images', filename)
  console.log(`uploading image to cloudinary: ${filePath}...`)
  const resp = await cloudinary.v2.uploader.upload(filePath, {
    folder,
    public_id,
    resource_type: 'image',
  })

  if (resp.public_id) {
    console.log('image uploaded:', resp.public_id)
  } else {
    console.log('image upload failed')
    console.log(resp)
  }
}

uploadToCloudinary()
