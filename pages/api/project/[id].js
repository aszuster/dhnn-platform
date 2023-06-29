import dbConnect from "lib/dbConnect"
import Projects from "models/Projects"
import { deleteFile, uploadFile } from "../files"

export default async function handler(req, res) {
  const { id } = req.query
  if (id) {
    if (req.method === "GET") {
      try {
        await dbConnect()
        const result = await Projects.findById(id)
        res.status(200).send(result)
      } catch (error) {
        res.status(500).send(`Ocurrió un error inesperado. Error: ${error}`)
      }
    }
    if (req.method === "PUT") {
      try {
        await dbConnect()
        let body = req.body
        const result = await Projects.findByIdAndUpdate(id, body)
        res.status(200).send(result)
      } catch (error) {
        res.status(304).send(`Ocurrió un error inesperado. Error: ${error}`)
      }
    }
    if (req.method === "DELETE") {
      try {
        await dbConnect()
        const previous_project = await Projects.findById(id)
        if (previous_project.project_img) {
          await deleteFile(
            previous_project.project_img.public_id,
            "projects_preset"
          )
        }
        if (previous_project.images.length > 0) {
          await Promise.all(
            previous_project.images.map(async (image) => {
              await deleteFile(image.public_id, "projects_preset")
            })
          )
        }
        const result = await Projects.deleteOne({ _id: id })
        res.status(200).send(result)
      } catch (error) {
        res.status(304).send(`Ocurrió un error inesperado. Error: ${error}`)
      }
    }
  }
}
