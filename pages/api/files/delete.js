import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUDNAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
})
export default async function handler(req, res) {
  const { public_id, preset } = req.body
  if (public_id) {
    if (req.method === "DELETE") {
      try {
        const result = await cloudinary.uploader.destroy(public_id, {
          upload_preset: preset,
        })
        res.status(200).send(result)
        return res
      } catch (error) {
        res.status(500).send(`Ocurrió un error inesperado. Error: ${error}`)
      }
    }
  }
}
