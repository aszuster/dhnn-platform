import dbConnect from "lib/dbConnect"
import News from "models/News"
import { deleteFile, uploadFile } from "../files"

export default async function handler(req, res) {
  const { id } = req.query
  if (id) {
    if (req.method === "GET") {
      try {
        await dbConnect()
        const result = await News.findById(id)
        res.status(200).send(result)
      } catch (error) {
        res.status(500).send(`Ocurrió un error inesperado. Error: ${error}`)
      }
    }
    if (req.method === "PUT") {
      try {
        await dbConnect()
        let body = req.body
        const result = await News.findByIdAndUpdate(id, body)
        res.status(200).send(result)
      } catch (error) {
        res.status(304).send(`Ocurrió un error inesperado. Error: ${error}`)
      }
    }
    if (req.method === "DELETE") {
      try {
        await dbConnect()
        const previous_news = await News.findById(id)
        await deleteFile(previous_news.image.public_id, "news_preset")
        const result = await News.deleteOne({ _id: id })
        res.status(200).send(result)
      } catch (error) {
        res.status(304).send(`Ocurrió un error inesperado. Error: ${error}`)
      }
    }
  }
}
