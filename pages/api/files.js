import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUDNAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
})

export const uploadFile = async (file, preset) => {
  try {
    const res = await cloudinary.uploader.upload(file, {
      upload_preset: preset,
    })
    return res
  } catch (error) {
    console.log(error)
  }
}

export const deleteFile = async (id_file, preset) => {
  try {
    const res = await cloudinary.uploader.destroy(id_file, {
      upload_preset: preset,
    })
    console.log(res)
    return res
  } catch (error) {
    console.log(error)
  }
}
