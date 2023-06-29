import dbConnect from "lib/dbConnect"
import categories from "models/Categories"
import Subcategories from "models/Subcategories"

export default async function handler(req, res) {
  await dbConnect()

  if (req.method === "POST") {
    try {
      let body = req.body
      const category = categories.create(body)
      return res.status(201).json(category)
    } catch (error) {
      let msg = "Ocurrió un error. Por favor comuníquese con el administrador."
      return res.status(500).json({
        message: msg,
      })
    }
  }

  try {
    await dbConnect()
    const result = await categories
      .find({})
      .populate({ path: "subcategories", model: Subcategories })
    res.status(200).send(result)
  } catch (error) {
    res.status(500).send(`Ocurrió un error inesperado. Error: ${error}`)
  }
}
