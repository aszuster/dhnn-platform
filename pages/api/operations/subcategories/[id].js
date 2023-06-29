import dbConnect from "lib/dbConnect"
import Categories from "models/Categories"
import subcategories from "models/Subcategories"

export default async function handler(req, res) {
  const { id } = req.query
  if (id) {
    if (req.method === "GET") {
      try {
        await dbConnect()
        const result = await subcategories.findById(id)
        res.status(200).send(result)
      } catch (error) {
        res.status(500).send(`Ocurrió un error inesperado. Error: ${error}`)
      }
    }
    if (req.method === "PUT") {
      try {
        await dbConnect()
        let body = req.body
        const result = await subcategories.findByIdAndUpdate(id, body)
        res.status(200).send(result)
      } catch (error) {
        res.status(304).send(`Ocurrió un error inesperado. Error: ${error}`)
      }
    }
    if (req.method === "DELETE") {
      try {
        await dbConnect()
        await Categories.updateMany({}, { $pull: { subcategories: id } })
        const result = await subcategories.deleteOne({ _id: id })
        res.status(200).send(result)
      } catch (error) {
        res.status(304).send(`Ocurrió un error inesperado. Error: ${error}`)
      }
    }
  }
}
