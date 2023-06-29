import dbConnect from "lib/dbConnect"
import Categories from "models/Categories"
import Sections from "models/Section"
import Subcategories from "models/Subcategories"

export default async function handler(req, res) {
  await dbConnect()

  if (req.method === "POST") {
    try {
      let body = req.body
      const sections = Sections.create(body)
      return res.status(201).json(sections)
    } catch (error) {
      let msg = "Ocurrió un error. Por favor comuníquese con el administrador."
      return res.status(500).json({
        message: msg,
      })
    }
  }

  try {
    await dbConnect()
    const result = await Sections.find({}).populate({
      path: "categories",
      model: Categories,
      populate: { path: "subcategories", model: Subcategories },
    })
    res.status(200).send(result)
  } catch (error) {
    res.status(500).send(`Ocurrió un error inesperado. Error: ${error}`)
  }
}
