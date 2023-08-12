export default function cloudinaryLoader({
  src,
  width,
  quality,
}: {
  src: string
  width: number
  quality?: number
}) {
  // public_id: ignore file extension of src
  const public_id = process.env.NEXT_PUBLIC_CLOUDINARY_ROOT_FOLDER + src.replace(/\.[^/.]+$/, '')
  const params = ['f_auto', 'c_limit', `w_${width}`, `q_${quality || 'auto'}`]
  return `https://res.cloudinary.com/${
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  }/image/upload/${params.join(',')}/${public_id}`
}
